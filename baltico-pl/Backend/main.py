from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
from database import SessionLocal, engine
import models
import schemas

# To tworzy tabele w bazie (jeśli ich nie ma)
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# --- KONFIGURACJA CORS (Odblokowanie Frontendu) ---
origins = [
    "http://localhost:5173",  # Twój React
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- ZALEŻNOŚCI ---
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- ENDPOINTY ---

@app.get("/")
def read_root():
    return {"message": "Serwer Baltico działa poprawnie!"}

@app.post("/api/bookings", response_model=schemas.BookingResponse)
def create_booking(booking: schemas.BookingCreate, db: Session = Depends(get_db)):
    
    # 1. Walidacja dat (czy data końcowa jest po początkowej)
    if booking.start_date >= booking.end_date:
        raise HTTPException(status_code=400, detail="Data końcowa musi być późniejsza niż początkowa")

    # 2. Sprawdzenie dostępności (czy termin nie koliduje z inną rezerwacją)
    collision = db.query(models.Reservation).filter(
        models.Reservation.cottages_id == booking.cottage_id,
        models.Reservation.status != 'cancelled',
        or_(
            and_(models.Reservation.start_date <= booking.start_date, models.Reservation.end_date >= booking.start_date),
            and_(models.Reservation.start_date <= booking.end_date, models.Reservation.end_date >= booking.end_date),
            and_(models.Reservation.start_date >= booking.start_date, models.Reservation.end_date <= booking.end_date)
        )
    ).first()

    if collision:
        raise HTTPException(status_code=409, detail="Ten termin jest już zajęty!")

    # 3. Pobranie danych domku i obliczenie ceny
    cottage = db.query(models.Cottage).filter(models.Cottage.id == booking.cottage_id).first()
    
    if not cottage:
        raise HTTPException(status_code=404, detail=f"Domek o ID {booking.cottage_id} nie istnieje")

    # PROSTA MATEMATYKA (bo w bazie masz już liczbę INTEGER)
    price_per_night = cottage.price_per_night 
    nights = (booking.end_date - booking.start_date).days
    total_price = nights * price_per_night

    # 4. Zapisanie rezerwacji w bazie
    new_reservation = models.Reservation(
        start_date=booking.start_date,
        end_date=booking.end_date,
        cottages_id=booking.cottage_id,
        users_id=booking.user_id,
        total_price=float(total_price), # Konwersja na float (dla kolumny float8 w bazie)
        status="confirmed"
    )
    
    db.add(new_reservation)
    db.commit()
    db.refresh(new_reservation)
    
    return {
        "status": "success", 
        "reservation_id": new_reservation.id, 
        "total_price": total_price
    }
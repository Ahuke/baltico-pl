from pydantic import BaseModel
from datetime import date

# To jest model tego, co Frontend wysyła do nas, gdy ktoś klika "Rezerwuj"
class BookingCreate(BaseModel):
    cottage_id: str
    user_id: int
    start_date: date
    end_date: date

# To jest model odpowiedzi (np. potwierdzenie rezerwacji)
class BookingResponse(BaseModel):
    status: str
    reservation_id: int
    total_price: float
from sqlalchemy import Column, Integer, String, Date, Float, ForeignKey
from database import Base

class Cottage(Base):
    __tablename__ = "cottages"
    id = Column(String, primary_key=True)
    title = Column(String)
    price_per_night = Column(Integer)

class Reservation(Base):
    __tablename__ = "reservations"
    id = Column(Integer, primary_key=True, index=True)
    start_date = Column(Date)
    end_date = Column(Date)
    status = Column(String, default="confirmed")
    total_price = Column(Float)
    
    # Tu zostaje relacja, bo klasa Cottage istnieje wyżej
    cottages_id = Column(String, ForeignKey("cottages.id"))
    
    # --- ZMIANA TUTAJ ---
    # Usunęliśmy ForeignKey("users.id"), żeby Python nie szukał brakującej klasy User
    users_id = Column(Integer)
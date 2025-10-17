from sqlalchemy import Column, Integer, String
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)

 # Relationship to Timer
    timers = relationship("Timer", back_populates="user", cascade="all, delete")


class Timer(Base):
    __tablename__ = "timers"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    seconds = Column(Integer, default=1500)  # 25 minutes
    running = Column(Boolean, default=False)

    # Relationship back to User
    user = relationship("User", back_populates="timers")

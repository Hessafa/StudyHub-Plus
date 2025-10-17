from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Timer state
state = {
    "seconds": 25 * 60,
    "running": False
}

@app.get("/api/status")
def get_status():
    return state

@app.post("/api/start")
def start_timer():
    state["running"] = True
    return {"ok": True}

@app.post("/api/restart")
def restart_timer():
    state["seconds"] = 25 * 60
    state["running"] = False
    return {"ok": True}

@app.post("/api/tick")
def tick():
    if state["running"] and state["seconds"] > 0:
        state["seconds"] -= 1
    return {"seconds": state["seconds"]}

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# MODELS
# -------------------------

class LoginRequest(BaseModel):
    username: str
    password: str


class Task(BaseModel):
    title: str
    description: str
    priority: str
    department: str
    owner: str
    status: str
    goal: str
    dueDate: str


class Member(BaseModel):
    name: str
    role: str


class Milestone(BaseModel):
    title: str


# -------------------------
# LOGIN
# -------------------------

@app.post("/login")
def login(data: dict):

    username = data.get("username", "").strip()
    password = data.get("password", "").strip()

    if username and password:

        return {
            "success": True
        }

    return {
        "success": False
    }


# -------------------------
# TASKS DATA
# -------------------------

tasks = [
    {
        "id": 1,
        "title": "Angular Dashboard",
        "description": "Develop dashboard module",
        "priority": "High",
        "department": "Frontend",
        "owner": "Kareena",
        "status": "In Progress",
        "goal": "Dashboard ready for review",
        "dueDate": "2026-07-20"
    },
    {
        "id": 2,
        "title": "Login API",
        "description": "Authentication integration",
        "priority": "Medium",
        "department": "Backend",
        "owner": "Avinash",
        "status": "Completed",
        "goal": "Authentication API integration",
        "dueDate": "2026-07-18"
    }

]


@app.get("/tasks")
def get_tasks():
    return tasks


@app.post("/tasks")
def add_task(task: Task):
    tasks.append({
        "id": len(tasks) + 1,
        "title": task.title,
        "description": task.description,
        "priority": task.priority,
        "department": task.department,
        "owner": task.owner,
        "status": task.status,
        "goal": task.goal,
        "dueDate": task.dueDate
    })
    return {"message": "Task Added"}


@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):

    global tasks

    tasks = [
        task for task in tasks
        if task["id"] != task_id
    ]

    return {"message": "Task Deleted"}


# -------------------------
# TEAM MEMBERS
# -------------------------

members = [
    {
        "id": 1,
        "name": "Kareena",
        "role": "Frontend Developer"
    },
    {
        "id": 2,
        "name": "Avinash",
        "role": "Backend Developer"
    },
    {
        "id": 3,
        "name": "Samith",
        "role": "UI Developer"
    }
]


@app.get("/members")
def get_members():
    return members


@app.post("/members")
def add_member(member: Member):

    members.append({
        "id": len(members) + 1,
        "name": member.name,
        "role": member.role
    })

    return {"message": "Member Added"}


@app.delete("/members/{member_id}")
def delete_member(member_id: int):

    global members

    members = [
        member for member in members
        if member["id"] != member_id
    ]

    return {"message": "Member Deleted"}


# -------------------------
# MILESTONES
# -------------------------

milestones = [
    {
        "id": 1,
        "title": "Login Module"
    },
    {
        "id": 2,
        "title": "Dashboard Module"
    },
    {
        "id": 3,
        "title": "Task Module"
    }
]


@app.get("/milestones")
def get_milestones():
    return milestones


@app.post("/milestones")
def add_milestone(milestone: Milestone):

    milestones.append({
        "id": len(milestones) + 1,
        "title": milestone.title
    })

    return {"message": "Milestone Added"}


@app.delete("/milestones/{milestone_id}")
def delete_milestone(milestone_id: int):

    global milestones

    milestones = [
        milestone for milestone in milestones
        if milestone["id"] != milestone_id
    ]

    return {"message": "Milestone Deleted"}
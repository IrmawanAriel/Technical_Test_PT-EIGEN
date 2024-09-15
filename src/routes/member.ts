import { Router } from "express";
import { CreateMember, GetAll } from "../handlers/MemberHandlers";

const MemberRoute = Router()

MemberRoute.get('/', GetAll)
MemberRoute.post('/create', CreateMember)

export default MemberRoute;
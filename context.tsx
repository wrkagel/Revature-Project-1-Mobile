import { createContext } from "react";
import ReimbursementItem from "./models/reimbursement-item";


const ExpenseContext = createContext<{managerId:string, employeeId:string, reimbursementList:ReimbursementItem[]}>(
    {managerId:"", employeeId:"", reimbursementList:[]}
);

export default ExpenseContext;
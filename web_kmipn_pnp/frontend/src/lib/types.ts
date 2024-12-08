import { ChangeEventHandler, HTMLAttributes } from "react"

export interface Category {
    id: number,
    categoriName: string,
    description: string
}

export type InputProps = {
    className?: HTMLAttributes<HTMLDivElement> | string,
    value: string | number,
    onChange: ChangeEventHandler<HTMLSelectElement>,
    name?: string,
    id?: string
}

export type submission = {
    id: number;
    teamId: number;
    team: any;
    round: string;
    status: string;
    createdAt: string;
}

export interface Categories {
    id: number;
    categoriName: string;
    deadline: string;
    description: string | null
}

export interface Members {
    name: string,
    nim: string,
    email: string,
    noWA: string,
    prodi: string,
    fileKTM: string,
    role: string
}

export interface User {
    email: string;
    id: string;
    name: string;
    role: "participant" | "juri" | "admin" | string;
    verified: boolean;
}

export interface teamMemberType {
    teamID: number;
    id?: number,
    teamName: string,
    categori: string,
    institution: string,
    lectureName: string,
    lectureNip: string,
    linkProposal: string,
    statusProposal: string,
    statusSubmission: string,
    round: string,
    verified: boolean,
    isPrposalrejected: boolean;
    reasonRejected: string;
    teamMembers?: any
}
export interface teamMember1 {
    id?: number,
    teamName: string,
    categori: string,
    institution: string,
    lectureName: string,
    lectureNip: string,
    linkProposal: string,
    statusProposal: string,
    statusSubmission: string,
    round: string,
    verified: boolean,
    teamMembers?: Members[]
}

export interface Team {
    id?: number;
    name: string;
    categoryID: number;
    institution: string;
    lectureID: number;
    verified: boolean;
}

export type Proposal = {
    id?: number;
    teamId: number;
    fileLink: string;
    status: string;
    comments: string;
    assessment: any;
    team: any;
    file: any;
}

export interface Assessment {
    id?: number;
    proposalID?: number;
    juriID?: string;
    score: number;
}

export interface File {
    originalName: string;
    fileName: string;
    fileSize: number;
    type: string;
    path: string;
    createdAt: string;
}
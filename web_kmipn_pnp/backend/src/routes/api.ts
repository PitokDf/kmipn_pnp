import { Router } from "express";
import { addUser, AllUser, CheckUserTeam, DeleteUser, GetUserById, updateUser } from "../controllers/Usercontroller";
import { login, logout, register, verifyEmail } from "../controllers/AuthController";
import { authenticateJWT } from "../middlewares/tokenAuth";
import { createCategory, deleteCategory, getAllCategory, getAllCategoryClose, updateCategory } from "../controllers/CategoryController";
import { loginValidator } from "../validators/LoginValidator";
import { createTeam, getDataTeam } from "../controllers/TeamController";
import { createLecture } from "../controllers/LectureController";
import { createProposal, deleteProposal, downloadAllProposal, getAllproposal, updateProposal } from "../controllers/ProposalController";
import { getTeamMemberByUserID, saveTeamMember, verifyTeam } from "../controllers/TeamMemberController";
import { userLogin } from "../config/jwt";
import { addUserValidator, updateUserValidator } from "../validators/userValidator";
import { updateCategoriValidator } from "../validators/CategoriValidator";
import { uploadFile } from "../middlewares/mutlerUploadFile";
import { RegisterValidator } from "../validators/RegisterValidator";
import { getAllSubmissions } from "../controllers/SubmissionController";
import { getInfoDashboardAdmin } from "../controllers/DashboardController";

const router = Router();

router.get('/', authenticateJWT, (req, res) => {
    const timeStamp = new Date().toISOString();
    res.json({
        success: true,
        msg: 'Wellcome to API',
        userAgent: req.headers['user-agent'],
        ip: req.ip,
        refreshToken: req.cookies.refreshToken,
        timeStamp: timeStamp,
        apiVersion: "1.0.0"
    });
});

router.get('/users', authenticateJWT, AllUser);
router.post('/users', authenticateJWT, addUserValidator, addUser);
router.get('/users/:id', authenticateJWT, GetUserById);
router.put('/users/:id', authenticateJWT, updateUserValidator, updateUser);
router.delete('/users/:id', authenticateJWT, DeleteUser);

// authenticate  route
router.post('/register', RegisterValidator, register);
router.post('/login', loginValidator(), login);
router.post('/verify-email', verifyEmail);
router.post('/logout', logout);

router.get("/submissions", authenticateJWT, getAllSubmissions)

router.post("/lecture", authenticateJWT, createLecture);
router.post("/team", authenticateJWT, createTeam);

router.post("/upload-proposal", authenticateJWT, uploadFile.single("file_proposal"), createProposal);
router.get("/proposals", authenticateJWT, getAllproposal);
router.delete("/proposals/:id", authenticateJWT, deleteProposal);
router.put("/proposals/:id", authenticateJWT, updateProposal);
router.get("/download-proposal", authenticateJWT, downloadAllProposal);
router.post(
    "/save-team-member",
    authenticateJWT,
    uploadFile.fields([
        { name: 'ktm_agg1', maxCount: 1 },
        { name: 'ktm_agg2', maxCount: 1 },
        { name: 'ktm_agg3', maxCount: 1 }
    ]),
    saveTeamMember
);


router.get("/all-team-member", authenticateJWT, getDataTeam);
router.get("/team-member", authenticateJWT, getTeamMemberByUserID);
router.put("/team-member/:teamID", authenticateJWT, verifyTeam);
router.get("/check-team-compleate", authenticateJWT, CheckUserTeam);

router.get("/admin/dashboard", getInfoDashboardAdmin)
router.get('/categories', getAllCategory);
router.post('/categories', authenticateJWT, updateCategoriValidator, createCategory);
router.get('/categories-close', authenticateJWT, getAllCategoryClose);
router.put('/categories/:id', authenticateJWT, updateCategoriValidator, updateCategory);
router.delete('/categories/:id', authenticateJWT, updateCategoriValidator, deleteCategory);
router.get('/user-login', authenticateJWT, async (req, res) => {
    const user = await userLogin(req);
    return res.status(200).json({ user });
});
export default router;
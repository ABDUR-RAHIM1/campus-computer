
export const BASE_URL = "https://campuscomputer.cc"

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const demoProfilePicture = "https://cdn-icons-png.flaticon.com/512/149/149071.png"

export const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;
export const getStudentTokenFormApi = "/token"

// ---------------------  admin -------------
export const adminRegister = "/auth/admin/register"
export const adminLogin = "/auth/admin/login"


//  qucikLink Start
export const quickLinkCreateGet = "/quickLink"
//  qucikLink End



// ---------------------  admin -------------



//  frontend Start here

// -----------------  student login------------------------
export const studentRegister = "/auth/student/register"
export const studentLogin = "/auth/student/login"
export const studentGetAll = "/auth/student/all"
export const studentGetMy = "/auth/student/myAccount"
export const studentAccountDelete = "/auth/student/action/" // update / delete

//  profile
export const studentProfileCreate = "/student/profile"
export const studentProfileGetMe = "/student/profile/me"
export const studentProfileGetMeAll = "/student/profile/meAll"
export const studentProfileById = "/student/profile/byId/"
export const studentProfileUpdateDelete = "/student/profile/action/"

export const studentProfileGetAllByAdmin = "/student/profile/all"
//  profile end
// -----------------  student login------------------------



//  ----------------- Services ---------------------------
export const servicesPostGetAll = "/services/postGet"
//  ----------------- Services ---------------------------


// ------------------ Order ------------------------------
export const orderPostGetall = "/order/postGet"
export const orderGetMe = "/order/myOrder"
export const orderDetails = "/order/details/"
export const orderStatusUpdate = "/order/update/status/" // only admin can do this 
export const orderCencel = "/order/cancel/" // [cancelOrderId] only admin can do this 

// ------------------ Order ------------------------------




//  frontend End here



export const demoProfilePicture = "https://cdn-icons-png.flaticon.com/512/149/149071.png"

export const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;
export const getStudentTokenFormApi = "/token"

// ---------------------  admin -------------
export const adminRegister = "/auth/admin/register"
export const adminLogin = "/auth/admin/login"
// ---------------------  admin -------------



//  frontend Start here

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
// -----------------  student login------------------------
export const studentRegister = "/auth/student/register"
export const studentLogin = "/auth/student/login"
export const studentGetAll = "/auth/student/all"
export const studentGetMy = "/auth/student/myAccount"
// export const studentProfileUpdateDelete = "/auth/student/action/"

//  profile
export const studentProfileCreate = "/student/profile"
export const studentProfileGetMe = "/student/profile/me"
export const studentProfileGetMeAll = "/student/profile/meAll"
export const studentProfileById = "/student/profile/byId/"
//  profile end
// -----------------  student login------------------------



//  ----------------- Services ---------------------------
export const servicesPostGetAll = "/services/postGet"
export const servicesGetMy = "/services/matchWithMe"
//  ----------------- Services ---------------------------


// ------------------ Order ------------------------------
export const orderPostGetall = "/order/postGet"
export const orderGetMe = "/order/myOrder"
export const orderDetails = "/order/details/"
export const orderStatusUpdate = "/order/update/status/" // only admin can do this 

// ------------------ Order ------------------------------




//  frontend End here
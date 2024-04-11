import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js"
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;
  console.log("Email", email);
  res.status(200).json({
    message: "Got email",
  });

//   if (fullName === "") {
//     throw new ApiError(400, "Fullname required")
//   }

  if (
    [fullName,email,username,password].some((field) => field?.trim()==="")
  ) {
    throw new ApiError(400, "All fields required")
  }

 const ExistingUser = User.findOne({
    $or: [{username},{email}]
  })

  if (ExistingUser) {
    throw new ApiError(409, "User with this email already exists")
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar Required")
  }

 const avatar = await uploadCloudinary(avatarLocalPath)
 const coverimage = await uploadCloudinary(coverImageLocalPath)
  
if (!avatar) {
    throw new ApiError(400, "avatar required")
}

const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverimage: coverimage?.url || "",
    email,
    password,
    username: username.toLowerCase()
})

const createdUser = User.findById(user._id).select(
    "-password -refreshToken"
)
if (!createdUser) {
    throw new ApiError(500, "Something went wrong while creating user")
}

return res.status(201).json(
  new ApiResponse(200, createdUser, "User Registered")
)

});

export { registerUser };

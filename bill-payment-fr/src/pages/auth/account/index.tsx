import { useState } from "react";
import { motion } from "framer-motion";
import { JSX } from "react/jsx-runtime";
import { useFormik } from "formik";
import { useAddUser, useLoginUser } from "@/hooks/users/mutation";
import { message } from "antd";
import { FaEye, FaEyeSlash } from "react-icons/fa";
export default function AuthForm(): JSX.Element {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const addUser: any = useAddUser();
  const loginUser :any= useLoginUser() 
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      if(isLogin){
        loginUser.mutateAsync({ body:values })
         .then((res: any) => {
          localStorage.setItem('accessToken', res?.data?.token)
           message.success(res?.message);
            window.location.href= '/'
            formik.resetForm();
          })
         .catch((err: { message: string }) => {
            message.error(err?.message)
            formik.resetForm();
          });
      }
      else{
        addUser
          .mutateAsync({ body:values })
          .then(() => {
            formik.resetForm()
            setIsLogin(true)
            message.success('User created successfuly')})
          .catch((err: { message: string }) => {
            message.error(err?.message)
            formik.resetForm();
          });
        }
    },
  });
  return (
    <div className="relative w-96 mx-auto mt-10">
      <motion.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: isLogin ? 0 : 180 }}
        transition={{ duration: 0.5 }}
        className="relative preserve-3d"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute w-full backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className=" p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-center text-lg font-bold">Login</h2>
            <form action="post" onSubmit={formik.handleSubmit}>
            <label>
              Username
              <input
                type="text"
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="shadow-md rounded-2xl p-2 w-full mb-4"
                placeholder="Username"
              />
            </label>
            <label className="relative">
                Password
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="shadow-md rounded-2xl p-2 w-full mb-4 pr-10" // Add padding for the eye icon
                    placeholder="Password"
                  />
                  <span
                    className="absolute right-3 top-1/3 transform -translate-y-1/2 cursor-pointer text-gray-600"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </label>
            <div className="flex justify-end p-2">
              <span className="hover:text-amber-500 cursor-pointer text-sm">
                Forget password?
              </span>
            </div>
            <button className="shadow-md rounded-2xl p-2 w-full bg-amber-400 hover:bg-amber-500">
            Login
            </button>
            </form>
            <div className="flex justify-center p-2">
              <span
                className="hover:text-amber-500 cursor-pointer text-sm"
                onClick={() => setIsLogin(false)}
              >
                Don{}t have an account?
                <span className="text-blue-500">Register</span>
              </span>
            </div>
          </div>
        </div>

        <div
          className="absolute w-full backface-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="p-4 flex flex-col bg-white shadow-lg rounded-lg">
            <h2 className="text-center text-lg font-bold">Register</h2>
            <form onSubmit={formik?.handleSubmit}>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  className="shadow-md rounded-2xl p-2 w-full mb-4"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values?.email}
                />
              </label>
              <label>
                Username
                <input
                  type="text"
                  name="username"
                  className="shadow-md rounded-2xl p-2 w-full mb-4"
                  onChange={formik.handleChange}
                  value={formik.values?.username}
                  onBlur={formik.handleBlur}
                  placeholder="Username"
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  name="password"
                  className="shadow-md rounded-2xl p-2 w-full mb-4"
                  onChange={formik.handleChange}
                  value={formik.values?.password}
                  onBlur={formik.handleBlur}
                  placeholder="Password"
                />
              </label>
              <button
                type="submit"
                className="shadow-md rounded-2xl p-2 w-full bg-green-400 hover:bg-green-500"
              >
                Register
              </button>
            </form>
            <div className="flex justify-center p-2">
              <span
                className="hover:text-green-500 cursor-pointer text-sm"
                onClick={() => setIsLogin(true)}
              >
                Already have an account?{" "}
                <span className="text-blue-500">Login</span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

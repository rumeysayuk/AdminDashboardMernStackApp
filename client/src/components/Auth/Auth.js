import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import useStyles from "./styles";
import {GoogleLogin} from "react-google-login"
import {Avatar, Button, Container, Grid, Paper, Typography} from "@material-ui/core";
import {LockOutlined} from "@material-ui/icons";
import Input from "./Input";
import Icon from "./icon";
import {useNavigate} from "react-router-dom";
import * as api from "../../api/index"
import {handleAuth} from "../../redux/auth";
import apiAxios from "../../api/index";
import {toast} from "react-toastify";

const initialState = {name: "", lastname: "", email: "", password: "", confirmPassword: ""}
const Auth = () => {
   const classes = useStyles()
   const [isSignup, setIsSignup] = useState(true)
   const [showPassword, setShowPassword] = useState(false)
   const [formData, setFormData] = useState(initialState)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleSubmit = (e) => {
      e.preventDefault()
      if (isSignup) {
         apiAxios.post("/auth/register", formData).then(({data}) => {
            dispatch(handleAuth({token: data.access_token}))
            navigate("/")
         })
      } else {
         apiAxios.post("/auth/login", formData).then(({data}) => {
            dispatch(handleAuth({token: data.access_token}))
            navigate("/")
         })
      }
   }
   const handleChange = (e) => {
      e.preventDefault()
      setFormData({...formData, [e.target.name]: e.target.value})
   }

   const googleFailure = (err) => {
      // console.log(err)
      // console.log("Google sign in unsuccessfully.Try Again")
   }

   const googleSuccess = (res) => {
      const googleData = res.profileObj
      const token = res.tokenId

      try {
         dispatch({type: "AUTH", data: {res, token}})
         navigate("/")
      } catch (err) {
         console.log(err)
      }
   }

   const switchMode = () => {
      setIsSignup((prevIsSignup) => !prevIsSignup)
      setShowPassword(false)
   }

   const handleShowPassword = () => setShowPassword((prevShowPass) => !prevShowPass)
   return (
      <Container component={"main"} maxWidth={"xs"}>
         <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
               <LockOutlined/>
            </Avatar>
            <Typography variant={"h5"}>{isSignup ? "Sign up" : "Sign in"}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
               <Grid container spacing={2}>
                  {isSignup && (
                     <>
                        <Input name="name" label={"First name"} handleChange={handleChange} autoFocus half/>
                        <Input name="lastname" label={"Last name"} handleChange={handleChange} half/>
                     </>
                  )}
                  <Input name={"email"} label={"Email address"} handleChange={handleChange} type={"email"}/>
                  <Input name={"password"} label={"Password"} handleChange={handleChange}
                         type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                  {isSignup && <Input name={"confirmPassword"} label={"Confirm password"} handleChange={handleChange}
                                      type={"password"}/>}
               </Grid>
               <GoogleLogin clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} render={(renderProps) => (
                  <Button className={classes.googleButton} style={{marginBottom: "1rem"}} color={"primary"} fullWidth
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled} startIcon={<Icon/>} variant={"contained"}> Google Sign
                     In </Button>
               )}
                            onSuccess={googleSuccess} onFailure={googleFailure} cookiePolicy={"single_host_origin"}/>
               <Button type={"submit"} variant={"contained"} fullWidth color={"primary"} className={classes.submit}>
                  {isSignup ? "Sign up" : "Sign in"}
               </Button>
               <Grid container justifyContent={"flex-end"}>
                  <Grid item>
                     <Button onClick={switchMode}>
                        {isSignup ? "Already have an account ? Sign in" : "Don't have an account? Sign up"}
                     </Button>
                  </Grid>
               </Grid>
            </form>
         </Paper>
      </Container>
   )
}

export default Auth;
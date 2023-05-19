import { Request, Response } from 'express'
//import  User from '../model/resetPasswordModel'
import  User from '../model/registerModel'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import {
    generateOtp,
    generatePasswordResetToken,
    sendResetPasswordOTP,
    validatePasswordResetToken,
} from '../utils/resetPassword'

export const genOtp = async (req: Request, res: Response) => {
    const { email } = req.body

    try {
        let user = await User.findOne({ where: { email } })
        if (!user) {
            return res.status(404).json({
                message: 'Invalid user, kindly register first',
            })
        }

        if (user.otp && user.otp_expiry> new Date()) {
            await sendResetPasswordOTP(email, user.otp)

            return res.status(200).json({ message: 'OTP resent successfully' })
        }

        const { otp, otp_expiry} = await generateOtp()
        const token = await generatePasswordResetToken(email, res)
        await sendResetPasswordOTP(email, otp)

        user = await user.update({ otp, otp_expiry})

        return res.status(200).json({ message: 'OTP sent successfully', token })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const otpVerification = async (req: Request, res: Response) => {
    const { otp } = req.body

    try {
     
        const token = req.cookies.token

        if (!token) {
            return res.status(400).json({ error: 'Token not found' })
        }

        const isValidToken = validatePasswordResetToken(token)
        if (!isValidToken) {
            return res.status(400).json({ error: 'Invalid or expired token' })
        }

        const decodedToken: any = jwt.decode(token)

        const { email } = decodedToken

        const user = await User.findOne({ where: { email } })
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        if (otp !== user.otp) {
            return res.status(400).json({ error: 'Invalid OTP' })
        }

        return res.status(200).json({
            message:
                'OTP verified successfully. You can now change your password',
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    const { newPassword, confirmPassword } = req.body
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(400).json({ error: 'Token not found' })
        }

        const isValidToken = validatePasswordResetToken(token)
        if (!isValidToken) {
            return res.status(400).json({ error: 'Invalid or expired token' })
        }

        const decodedToken: any = jwt.decode(token)
        const { email } = decodedToken

        const user = await User.findOne({ where: { email } })
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords must match' })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 8)

        await user.update({ password: hashedPassword })

        return res.status(200).json({
            message: 'Password reset successfully',
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

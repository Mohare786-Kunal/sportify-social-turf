
import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Auth = () => {
  const [step, setStep] = useState(1); // 1: Phone input, 2: OTP input, 3: Profile completion
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  
  const handleSendOtp = () => {
    // In a real app, this would call Supabase signInWithOtp
    console.log("Sending OTP to", phoneNumber);
    setStep(2);
  };
  
  const handleVerifyOtp = () => {
    // In a real app, this would call Supabase verifyOtp
    console.log("Verifying OTP", otp);
    setStep(3);
  };
  
  const handleCompleteProfile = () => {
    // In a real app, this would save profile to Supabase
    console.log("Saving profile", { fullName, address });
    // Then redirect to /turfs
    window.location.href = "/turfs";
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center pt-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass p-8 rounded-xl w-full max-w-md"
      >
        {/* Step 1: Phone Input */}
        {step === 1 && (
          <>
            <h1 className="text-2xl font-bold text-center mb-8">Sign In / Sign Up</h1>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="tel"
                  placeholder="9876543210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="pl-10"
                />
              </div>
              <p className="text-xs mt-2 opacity-70">
                We'll send a one-time password to this number
              </p>
            </div>
            
            <Button
              onClick={handleSendOtp}
              disabled={phoneNumber.length < 10}
              className="w-full bg-turfGreen dark:bg-turfGold text-white dark:text-turfBlue hover:bg-turfGreen-dark dark:hover:bg-turfGold-dark"
            >
              Get OTP
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </>
        )}
        
        {/* Step 2: OTP Input */}
        {step === 2 && (
          <>
            <div className="flex items-center mb-8">
              <button 
                onClick={() => setStep(1)} 
                className="mr-2 p-1 rounded-full hover:bg-background/20"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-2xl font-bold">Verify OTP</h1>
            </div>
            
            <div className="mb-2">
              <p className="text-sm opacity-70">
                We've sent a verification code to
              </p>
              <p className="font-semibold">+91 {phoneNumber}</p>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Enter OTP</label>
              <Input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
              />
            </div>
            
            <Button
              onClick={handleVerifyOtp}
              disabled={otp.length < 6}
              className="w-full bg-turfGreen dark:bg-turfGold text-white dark:text-turfBlue hover:bg-turfGreen-dark dark:hover:bg-turfGold-dark"
            >
              Verify OTP
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            
            <p className="text-center text-sm mt-4">
              Didn't receive code?{" "}
              <button 
                onClick={() => setStep(1)} 
                className="text-turfGreen dark:text-turfGold hover:underline"
              >
                Resend
              </button>
            </p>
          </>
        )}
        
        {/* Step 3: Profile Completion */}
        {step === 3 && (
          <>
            <h1 className="text-2xl font-bold text-center mb-8">Complete Your Profile</h1>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <Input
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <Input
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            
            <Button
              onClick={handleCompleteProfile}
              disabled={!fullName.trim()}
              className="w-full bg-turfGreen dark:bg-turfGold text-white dark:text-turfBlue hover:bg-turfGreen-dark dark:hover:bg-turfGold-dark"
            >
              Complete Profile
            </Button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Auth;

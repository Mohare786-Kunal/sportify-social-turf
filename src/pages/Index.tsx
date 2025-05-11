import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, MessageCircle, CreditCard, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import TurfCard from "@/components/TurfCard";
import { mockTurfs, mockPolls, mockMessages } from "@/data/mockData";
const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [featuredTurfs, setFeaturedTurfs] = useState(mockTurfs.slice(0, 3));
  useEffect(() => {
    const img = new Image();
    img.src = "/lovable-uploads/d25cf438-2d45-41e0-a072-e83688f9d6c4.png";
    img.onload = () => {
      setIsLoaded(true);
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05
      }
    })
  };
  const headingText = "Book Your Turf, Play Like a Pro!";
  return <div className="relative min-h-screen">
      {/* Background Image */}
      <div className={`fixed inset-0 bg-black transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`} style={{
      backgroundImage: `url('/lovable-uploads/d25cf438-2d45-41e0-a072-e83688f9d6c4.png')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed"
    }} />

      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-10" />

      {/* Content */}
      <div className="relative min-h-screen z-20">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center px-4 py-24">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="container text-center bg-gray-50">
            <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6" variants={itemVariants}>
              {headingText.split("").map((char, index) => <motion.span key={`${char}-${index}`} custom={index} variants={letterVariants} className={`inline-block ${char === " " ? "mr-2" : ""} text-glow-dark`}>
                  {char}
                </motion.span>)}
            </motion.h1>
            
            <motion.p className="text-lg lg:text-xl text-gray-200 mb-8 max-w-2xl mx-auto" variants={itemVariants}>
              Find and book sports turfs in Nagpur with ease. Join our community of sports enthusiasts!
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <Link to="/turfs">
                <Button size="lg" className="bg-turfGreen dark:bg-turfGold text-white dark:text-turfBlue hover:bg-turfGreen-dark dark:hover:bg-turfGold-dark transition-colors">
                  Browse Turfs
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Featured Turfs Section */}
        <section className="py-16 px-4 glass">
          <div className="container mx-auto">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5
          }} viewport={{
            once: true
          }} className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Featured Turfs</h2>
              <p className="text-lg opacity-80 max-w-2xl mx-auto">
                Discover the best sports facilities in Nagpur. Book instantly and start playing!
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {featuredTurfs.map((turf, index) => <TurfCard key={turf.id} id={turf.id} name={turf.name} address={turf.address} city={turf.city} imageUrl={turf.imageUrl} pricePerHour={turf.basePrice} sports={turf.sports} index={index} />)}
            </div>
            
            <div className="mt-10 text-center">
              <Link to="/turfs">
                <Button variant="outline" className="border-turfGreen dark:border-turfGold text-turfGreen dark:text-turfGold hover:bg-turfGreen/10 dark:hover:bg-turfGold/10">
                  View All Turfs
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5
          }} viewport={{
            once: true
          }} className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4 text-white text-glow-dark">Why Choose Us</h2>
              <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                TurfBook provides a seamless experience for sports enthusiasts
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard icon={<CalendarDays className="h-8 w-8" />} title="Seamless Booking" description="Book your turf effortlessly with our user-friendly interface. Pay online and receive instant confirmation." delay={0.1} />
              <FeatureCard icon={<MessageCircle className="h-8 w-8" />} title="Community Chat" description="Connect with players, organize games, and find teammates in our community chat." delay={0.2} />
              <FeatureCard icon={<CreditCard className="h-8 w-8" />} title="Secure Payments" description="Pay securely with Razorpay for a hassle-free experience. No hidden charges." delay={0.3} />
            </div>
          </div>
        </section>

        {/* Community Teaser */}
        <section className="py-16 px-4 glass">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <motion.div initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.5
            }} viewport={{
              once: true
            }}>
                <h2 className="text-3xl font-bold mb-4">Join the Community</h2>
                <p className="text-lg mb-6 opacity-80">
                  Connect with other players, join games, and find teammates for your next match. Our community is active and growing!
                </p>
                <div className="mb-6 space-y-2">
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Active Players:</span>
                    <span>500+</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Weekly Games:</span>
                    <span>50+</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Player Polls:</span>
                    <span>Always Open</span>
                  </div>
                </div>
                <Link to="/community">
                  <Button className="bg-turfGreen dark:bg-turfGold text-white dark:text-turfBlue hover:bg-turfGreen-dark dark:hover:bg-turfGold-dark transition-colors">
                    Join Community
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5,
              delay: 0.2
            }} viewport={{
              once: true
            }} className="glass p-5 rounded-lg">
                <h3 className="font-bold mb-4">Community Chat Preview</h3>
                <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
                  {mockMessages.map(msg => <motion.div key={msg.id} initial={{
                  opacity: 0,
                  x: 20
                }} animate={{
                  opacity: 1,
                  x: 0
                }} transition={{
                  duration: 0.3
                }} className="p-3 rounded-lg glass">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-sm">{msg.userName}</span>
                        <span className="text-xs opacity-70">
                          {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                        </span>
                      </div>
                      <p className="text-sm">{msg.message}</p>
                    </motion.div>)}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>;
};

// Feature Card Component
const FeatureCard = ({
  icon,
  title,
  description,
  delay = 0
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}) => {
  return <motion.div initial={{
    opacity: 0,
    y: 30
  }} whileInView={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5,
    delay
  }} viewport={{
    once: true
  }} whileHover={{
    y: -5,
    transition: {
      duration: 0.2
    }
  }} className="glass p-6 rounded-xl text-center">
      <div className="inline-flex items-center justify-center bg-turfGreen/10 dark:bg-turfGold/10 p-3 rounded-full mb-4 text-turfGreen dark:text-turfGold">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-sm opacity-80">{description}</p>
    </motion.div>;
};
export default Index;
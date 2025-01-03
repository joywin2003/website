import { Mic2, Guitar, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Gift } from "lucide-react";
import Link from "next/link";
export default function FullScreenCTA() {
  return (
    <div className="min-h-screen   text-white flex items-center justify-center p-5 md:p-10">
      <div className="max-w-7xl w-full mx-auto space-y-12">
        <h1 className="text-4xl text-red-500 md:text-6xl font-bold text-center leading-tight">
          Explore What&apos;s Worth Living: <br />
          {/* <span className="text-red-500">Inspiration Unleashed: Join Us at TEDx 2024</span> */}
        </h1>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <p className="text-xl lg:text-2xl lg:text-left text-center text-gray-300 leading-relaxed">
              Join us for an extraordinary day of inspiration, innovation, and
              connection. Our TEDx event brings together visionaries, thought
              leaders, and change-makers from diverse fields to share ideas that
              will challenge your perspective and ignite your curiosity.
            </p>
            <div className="space-y-4 hidden lg:block">
              <div className="flex items-center space-x-3 text-lg">
                <Calendar className="h-6 w-6 text-red-500" />
                <span>December 14, 2024 | 9:00 AM - 4:00 PM</span>
              </div>
              <div className="flex items-center space-x-3 text-lg">
                <MapPin className="h-6 w-6 text-red-500" />
                <span>St Joseph Engineering College - Kalam Hall</span>
              </div>
            </div>
            <p className="text-lg  text-center lg:text-left hidden lg:block text-gray-400">
              Experience powerful talks, an interactive and creative walkway,
              and networking opportunities that will leave you inspired and
              ready to make a difference in your community and beyond
            </p>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <Card className="bg-black/30 border-none">
                <CardContent className="p-6 text-center">
                  <Mic2 className="h-12 w-12 mx-auto mb-3 text-red-500" />
                  <h3 className="text-3xl font-semibold mb-2">8</h3>
                  <p className="text-gray-300">Speakers</p>
                </CardContent>
              </Card>

              <Card className="bg-black/30 border-none">
                <CardContent className="p-6 text-center">
                  <Guitar className="h-12 w-12 mx-auto mb-3 text-red-500" />
                  <h3 className="text-3xl font-semibold mb-2">4</h3>
                  <p className="text-gray-300">Performers</p>
                </CardContent>
              </Card>
              <Card className="bg-black/30 border-none col-span-2 md:col-span-1">
                <CardContent className="p-6 text-center">
                  <Gift className="h-12 w-12 mx-auto mb-3 text-red-500" />
                  <h3 className="text-2xl mb-2 font-semibold">
                    Food & Goodies
                  </h3>
                </CardContent>
              </Card>
            </div>

            <div className="bg-black/20 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4">What to Expect:</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Thought-provoking talks from industry leaders</li>
                <li>Interactive and creative walkways</li>
                <li>Networking opportunities with like-minded individuals</li>
                <li>Live musical and artistic performances</li>
                <li>Delicious catered meals and refreshments</li>
              </ul>
            </div>
            <div className="space-y-4 block ml-4 lg:hidden">
              <div className="flex items-center space-x-3 text-lg">
                <Calendar className="h-6 w-6 text-red-500" />
                <span>December 14, 2024 | 9:00 AM - 5:30 PM</span>
              </div>
              <div className="flex items-center space-x-3 text-lg">
                <MapPin className="h-6 w-6 text-red-500" />
                <span>St Joseph Engineering College - Kalam Hall</span>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="text-center space-y-6"> */}
        {/* <p className="text-xl text-gray-300">
            Limited spots available! <br />
            <span className="text-gray-300 font-semibold text-xl">
              Register now to secure your spot. <br />
            </span>
          </p> */}

        {/* <Link href={"/register"}>
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 mt-4 text-white py-6 px-8 text-xl transition-all duration-300 transform hover:scale-105"
            >
              Claim Your Spot!
            </Button>
          </Link> */}
        {/* </div> */}
      </div>
    </div>
  );
}

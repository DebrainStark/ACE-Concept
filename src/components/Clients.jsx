import React from "react";
import { User } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Alice Johnson",
    position: "Marketing Director, ABC Corp",
    feedback:
      "Working with this team was a fantastic experience. They exceeded our expectations at every turn.",
    bgColor: "bg-blue-500",
  },
  {
    id: 2,
    name: "Robert Smith",
    position: "CEO, Eventify",
    feedback:
      "Their creativity and professionalism are unmatched. We can't wait to collaborate again!",
    bgColor: "bg-purple-500",
  },
  {
    id: 3,
    name: "Sophia Lee",
    position: "Operations Manager, Dream Events",
    feedback:
      "From start to finish, the process was seamless. They truly brought our vision to life.",
    bgColor: "bg-green-500",
  },
  {
    id: 4,
    name: "James Brown",
    position: "Founder, Luxe Gatherings",
    feedback:
      "A highly skilled team that goes above and beyond to deliver exceptional results.",
    bgColor: "bg-pink-500",
  },
];

const Avatar = ({ name, bgColor }) => {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`relative w-16 h-16 rounded-full flex items-center justify-center text-white ${bgColor} group-hover:ring-4 ring-offset-2 ring-offset-gray-800 ring-white/20 transition-all`}
    >
      {initials}
    </div>
  );
};

const ClientSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            What Our <span className="text-blue-500">Clients</span> Say
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Hear from some of the amazing brands we've had the privilege to work
            with.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group bg-gray-800 rounded-lg shadow-lg p-6 text-center transition-all hover:scale-105 hover:bg-gray-700/50"
            >
              <div className="mb-6 flex justify-center">
                <Avatar name={testimonial.name} bgColor={testimonial.bgColor} />
              </div>

              <p className="text-gray-300 italic mb-4">
                "{testimonial.feedback}"
              </p>

              <div className="mt-4">
                <h3 className="text-lg font-semibold text-white">
                  {testimonial.name}
                </h3>
                <p className="text-blue-400 text-sm mt-1">
                  {testimonial.position}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-all hover:scale-105 font-medium">
            Join Our Esteemed Clients
          </button>
        </div>
      </div>
    </section>
  );
};

export default ClientSection;

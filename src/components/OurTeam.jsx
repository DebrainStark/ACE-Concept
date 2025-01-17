import React from "react";
import team from "../assets/team.jpeg";

const teamMembers = [
  {
    id: 1,
    name: "Jane Doe",
    title: "Chief Executive Officer",
    image: team, // Replace with actual image URL
    bio: "Visionary leader driving innovation and excellence.",
  },
  {
    id: 2,
    name: "John Smith",
    title: "Head of Operations",
    image: team,
    bio: "Ensuring seamless execution and operational efficiency.",
  },
  {
    id: 3,
    name: "Emily Johnson",
    title: "Creative Director",
    image: team,
    bio: "Crafting memorable experiences with a touch of creativity.",
  },
  {
    id: 4,
    name: "Michael Brown",
    title: "Technical Lead",
    image: team,
    bio: "Pioneering technological solutions for impactful results.",
  },
];

const OurTeam = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            Meet Our <span className="text-blue-500">Team</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            A team of passionate professionals dedicated to delivering
            excellence.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group relative bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              {/* Team Member Image */}
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover"
              />

              {/* Text Box */}
              <div className="absolute bottom-0 w-full bg-black/70 text-center p-4">
                <h3 className="text-lg font-bold text-white">{member.name}</h3>
                <p className="text-blue-400 text-sm">{member.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;

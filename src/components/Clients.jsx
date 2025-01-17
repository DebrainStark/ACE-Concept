import React from "react";
import client1 from "../assets/team.jpeg";

const testimonials = [
  {
    id: 1,
    name: "Alice Johnson",
    position: "Marketing Director, ABC Corp",
    feedback:
      "Working with this team was a fantastic experience. They exceeded our expectations at every turn.",
    image: client1,
  },
  {
    id: 2,
    name: "Robert Smith",
    position: "CEO, Eventify",
    feedback:
      "Their creativity and professionalism are unmatched. We can't wait to collaborate again!",
    image: client1,
  },
  {
    id: 3,
    name: "Sophia Lee",
    position: "Operations Manager, Dream Events",
    feedback:
      "From start to finish, the process was seamless. They truly brought our vision to life.",
    image: client1,
  },
  {
    id: 4,
    name: "James Brown",
    position: "Founder, Luxe Gatherings",
    feedback:
      "A highly skilled team that goes above and beyond to deliver exceptional results.",
    image: client1,
  },
];

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

        {/* Testimonials Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group bg-gray-800 rounded-lg shadow-lg p-6 text-center transition-transform transform hover:scale-105"
            >
              {/* Client Logo or Avatar */}
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 mx-auto rounded-full object-contain mb-4"
              />
              {/* Client Feedback */}
              <p className="text-gray-300 italic">"{testimonial.feedback}"</p>
              <div className="mt-4">
                <h3 className="text-lg font-bold text-white">
                  {testimonial.name}
                </h3>
                <p className="text-blue-400 text-sm">{testimonial.position}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105">
            Join Our Esteemed Clients
          </button>
        </div>
      </div>
    </section>
  );
};

export default ClientSection;

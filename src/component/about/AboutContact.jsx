import { Formik, Form, Field } from "formik";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function AboutContact({ initialValues, handleSubmit }) {
  return (
    <div className="w-full min-h-screen bg-[#3f364c] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Left */}
        <div className="flex flex-col gap-6">
          <h2 className="text-4xl font-bold text-white leading-tight">
            Have a Questions?
            <br />
            Get in Touch
          </h2>

          <p className="text-gray-300 max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>

          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className="flex flex-col gap-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field name="name" placeholder="Name"
                  className="bg-transparent border border-gray-400 p-3 text-white rounded-lg" />

                <Field name="email" placeholder="Email Address"
                  className="bg-transparent border border-gray-400 p-3 text-white rounded-lg" />
              </div>

              <Field as="textarea" name="message" placeholder="Your Message"
                className="bg-transparent border border-gray-400 p-3 text-white h-32 rounded-lg" />

              <button type="submit"
                className="bg-pink-600 px-6 py-3 rounded-lg text-white w-fit">
                Send Message
              </button>
            </Form>
          </Formik>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-6 justify-center text-gray-200">
          <div className="flex items-center gap-4">
            <FaPhoneAlt className="bg-white text-pink-600 p-2 rounded" />
            01006164484
          </div>

          <div className="flex items-center gap-4">
            <FaEnvelope className="bg-white text-pink-600 p-2 rounded" />
            mohammedelgabry187@gmail.com
          </div>

          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="bg-white text-pink-600 p-2 rounded" />
            Address info here
          </div>
        </div>

      </div>
    </div>
  );
}
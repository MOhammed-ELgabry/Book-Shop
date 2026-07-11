

// import { Formik, Form, Field } from "formik";
// import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
// import { useLanguageStore } from "../../store/languageStore";
// import { dictionary } from "../../i18n/dictionary";

// export default function AboutContact({ initialValues, handleSubmit }) {
//   const lang = useLanguageStore((state) => state.lang);
//   const t = dictionary[lang];

//   return (
//     <div className="w-full min-h-screen bg-[#3f364c] flex items-center justify-center px-4 py-12">
//       <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10">

//         {/* Left */}
//         <div className="flex flex-col gap-6">

//           <h2 className="text-4xl font-bold text-white leading-tight">
//             {t.contactTitle}
//           </h2>

//           <p className="text-gray-300 max-w-md">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//           </p>

//           <Formik initialValues={initialValues} onSubmit={handleSubmit}>
//             <Form className="flex flex-col gap-4 mt-4">

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <Field
//                   name="name"
//                   placeholder={lang === "en" ? "Name" : "الاسم"}
//                   className="bg-transparent border border-gray-400 p-3 text-white rounded-lg"
//                 />

//                 <Field
//                   name="email"
//                   placeholder={lang === "en" ? "Email Address" : "البريد الإلكتروني"}
//                   className="bg-transparent border border-gray-400 p-3 text-white rounded-lg"
//                 />
//               </div>

//               <Field
//                 as="textarea"
//                 name="message"
//                 placeholder={lang === "en" ? "Your Message" : "رسالتك"}
//                 className="bg-transparent border border-gray-400 p-3 text-white h-32 rounded-lg"
//               />

//               <button
//                 type="submit"
//                 className="bg-pink-600 px-6 py-3 rounded-lg text-white w-fit"
//               >
//                 {lang === "en" ? "Send Message" : "إرسال"}
//               </button>
//             </Form>
//           </Formik>
//         </div>

//         {/* Right (Backend data → NOT translated) */}
//         <div className="flex flex-col gap-6 justify-center text-gray-200">

//           <div className="flex items-center gap-4">
//             <FaPhoneAlt className="bg-white text-pink-600 p-2 rounded" />
//             01006164484
//           </div>

//           <div className="flex items-center gap-4">
//             <FaEnvelope className="bg-white text-pink-600 p-2 rounded" />
//             mohammedelgabry187@gmail.com
//           </div>

//           <div className="flex items-center gap-4">
//             <FaMapMarkerAlt className="bg-white text-pink-600 p-2 rounded" />
//             Address info here
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// }
import { Formik, Form, Field } from "formik";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useLanguageStore } from "../../store/languageStore";
import { dictionary } from "../../i18n/dictionary";

export default function AboutContact({ initialValues, handleSubmit }) {
  const lang = useLanguageStore((state) => state.lang);
  const t = dictionary[lang];

  return (
    <div className="w-full min-h-screen bg-[#1e1a26] flex items-center justify-center px-6 py-24 relative overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">

        {/* Left Side: Text & Form */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <span className="text-pink-500 font-bold uppercase tracking-[0.3em] text-xs">Reach Out</span>
            <h2 className="text-5xl md:text-6xl font-black text-white leading-tight tracking-tighter">
              {t.contactTitle}
            </h2>
            <p className="text-gray-400 text-xl font-light leading-relaxed max-w-md">
              Have a question or just want to say hi? We'd love to hear from you.
            </p>
          </div>

          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-gray-400 text-xs font-bold uppercase px-1">Name</label>
                  <Field
                    name="name"
                    placeholder={lang === "en" ? "Enter your name" : "الاسم"}
                    className="bg-white/5 border border-white/10 p-4 text-white rounded-2xl focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition-all placeholder:text-gray-600"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-gray-400 text-xs font-bold uppercase px-1">Email</label>
                  <Field
                    name="email"
                    placeholder={lang === "en" ? "example@mail.com" : "البريد الإلكتروني"}
                    className="bg-white/5 border border-white/10 p-4 text-white rounded-2xl focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition-all placeholder:text-gray-600"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-gray-400 text-xs font-bold uppercase px-1">Message</label>
                <Field
                  as="textarea"
                  name="message"
                  placeholder={lang === "en" ? "Tell us everything..." : "رسالتك"}
                  className="bg-white/5 border border-white/10 p-4 text-white h-40 rounded-2xl focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition-all placeholder:text-gray-600 resize-none"
                />
              </div>

              <button
                type="submit"
                className="group relative bg-pink-600 hover:bg-pink-700 px-10 py-4 rounded-2xl text-white font-bold text-lg w-full md:w-fit transition-all shadow-xl shadow-pink-600/20 active:scale-95"
              >
                {lang === "en" ? "Send Message" : "إرسال"}
                <span className="ml-2 transition-transform group-hover:translate-x-1 inline-block">→</span>
              </button>
            </Form>
          </Formik>
        </div>

        {/* Right Side: Info Cards */}
        <div className="flex flex-col gap-6 justify-center">
          <div className="grid grid-cols-1 gap-6">
            <div className="group bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] flex items-center gap-6 transition-all hover:bg-white/10 hover:border-pink-500/30">
              <div className="w-16 h-16 bg-pink-600/20 rounded-2xl flex items-center justify-center text-pink-500 group-hover:bg-pink-600 group-hover:text-white transition-all">
                <FaPhoneAlt size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Call Us</span>
                <span className="text-white text-xl font-medium">01006164484</span>
              </div>
            </div>

            <div className="group bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] flex items-center gap-6 transition-all hover:bg-white/10 hover:border-pink-500/30">
              <div className="w-16 h-16 bg-pink-600/20 rounded-2xl flex items-center justify-center text-pink-500 group-hover:bg-pink-600 group-hover:text-white transition-all">
                <FaEnvelope size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Email Us</span>
                <span className="text-white text-xl font-medium break-all">mohammedelgabry187@gmail.com</span>
              </div>
            </div>

            <div className="group bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] flex items-center gap-6 transition-all hover:bg-white/10 hover:border-pink-500/30">
              <div className="w-16 h-16 bg-pink-600/20 rounded-2xl flex items-center justify-center text-pink-500 group-hover:bg-pink-600 group-hover:text-white transition-all">
                <FaMapMarkerAlt size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Visit Us</span>
                <span className="text-white text-xl font-medium">Cairo, Egypt</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
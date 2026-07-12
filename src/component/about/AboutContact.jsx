import { Formik, Form, Field } from "formik";
import { Phone, Mail, MapPin, Send, MessageSquare, User } from "lucide-react";
import { useLanguageStore } from "../../store/languageStore";
import { dictionary } from "../../i18n/dictionary";

export default function AboutContact({ initialValues, handleSubmit }) {
  const lang = useLanguageStore((state) => state.lang);
  const t = dictionary[lang];

  return (
    <div className="w-full min-h-screen bg-slate-900 flex items-center justify-center px-6 py-24 relative overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">

        {/* Left Side: Text & Form */}
        <div className="flex flex-col gap-12 animate__animated animate__fadeInLeft">
          <div className="flex flex-col gap-6">
            <span className="text-orange-500 font-black uppercase tracking-[0.4em] text-xs">Reach Out</span>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight">
              {t.contactTitle}
            </h2>
            <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-md">
              Have a question or just want to say hi? We'd love to hear from you.
            </p>
          </div>

          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className="flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-3">
                  <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest px-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-500 transition-colors" size={18} />
                    <Field
                      name="name"
                      placeholder={lang === "en" ? "John Doe" : "الاسم"}
                      className="w-full bg-white/5 border-2 border-white/10 p-4 pl-12 text-white rounded-2xl focus:border-orange-500 focus:bg-white/10 outline-none transition-all placeholder:text-slate-600 font-medium"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest px-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-500 transition-colors" size={18} />
                    <Field
                      name="email"
                      placeholder={lang === "en" ? "john@example.com" : "البريد الإلكتروني"}
                      className="w-full bg-white/5 border-2 border-white/10 p-4 pl-12 text-white rounded-2xl focus:border-orange-500 focus:bg-white/10 outline-none transition-all placeholder:text-slate-600 font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest px-1">Message</label>
                <div className="relative group">
                  <MessageSquare className="absolute left-4 top-5 text-slate-500 group-focus-within:text-orange-500 transition-colors" size={18} />
                  <Field
                    as="textarea"
                    name="message"
                    placeholder={lang === "en" ? "Tell us everything..." : "رسالتك"}
                    className="w-full bg-white/5 border-2 border-white/10 p-5 pl-12 text-white h-44 rounded-3xl focus:border-orange-500 focus:bg-white/10 outline-none transition-all placeholder:text-slate-600 font-medium resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="group relative bg-orange-500 hover:bg-orange-600 px-12 py-5 rounded-2xl text-white font-black text-lg w-full md:w-fit transition-all shadow-2xl shadow-orange-500/20 active:scale-95 flex items-center justify-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10">{lang === "en" ? "Send Message" : "إرسال"}</span>
                <Send size={20} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </Form>
          </Formik>
        </div>

        {/* Right Side: Info Cards */}
        <div className="flex flex-col gap-6 justify-center animate__animated animate__fadeInRight">
          <div className="grid grid-cols-1 gap-6">
            <div className="group bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] flex items-center gap-8 transition-all hover:bg-white/10 hover:border-orange-500/50 hover:-translate-x-2">
              <div className="w-20 h-20 bg-orange-500/20 rounded-2xl flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 shadow-lg">
                <Phone size={32} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Call Us</span>
                <span className="text-white text-2xl font-black tracking-tight">01006164484</span>
              </div>
            </div>

            <div className="group bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] flex items-center gap-8 transition-all hover:bg-white/10 hover:border-orange-500/50 hover:-translate-x-2">
              <div className="w-20 h-20 bg-orange-500/20 rounded-2xl flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 shadow-lg">
                <Mail size={32} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Email Us</span>
                <span className="text-white text-xl font-black tracking-tight break-all">mohammedelgabry187@gmail.com</span>
              </div>
            </div>

            <div className="group bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] flex items-center gap-8 transition-all hover:bg-white/10 hover:border-orange-500/50 hover:-translate-x-2">
              <div className="w-20 h-20 bg-orange-500/20 rounded-2xl flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 shadow-lg">
                <MapPin size={32} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Visit Us</span>
                <span className="text-white text-2xl font-black tracking-tight">Cairo, Egypt</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

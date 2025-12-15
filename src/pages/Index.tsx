import Header from "@/components/form/Header";
import Footer from "@/components/form/Footer";
import QuestionForm from "@/components/form/QuestionForm";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated floating shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse-glow" />
      </div>

      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <QuestionForm />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

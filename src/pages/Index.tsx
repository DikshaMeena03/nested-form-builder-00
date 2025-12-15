import Header from "@/components/form/Header";
import Footer from "@/components/form/Footer";
import QuestionForm from "@/components/form/QuestionForm";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-3xl mx-auto">
          <QuestionForm />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

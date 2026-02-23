import FAQSection from '@/components/Faq'; 
import AutomationOverview from '@/components/Overview';
import HomeMarquee from '@/components/Marque';
import Hero from '@/components/HomePage/Hero';
import SmartQuickLinks from '@/components/HomePage/SmartQuickLink';
import StepGuideline from '@/components/HomePage/Guidline';
import SpecialtyServices from '@/components/CollegeServices';
import ServiceBenefits from '@/components/HomePage/ServicesBenifit';
import Testimonials from '@/components/HomePage/Testimonial';
import StudentHelpline from '@/components/HomePage/StudentHelpline';

const CampusComputerPage = async () => {

    return (
        <div>

            <main>
                {/* Hero Section */}
                {/* <Hero /> */}
                {/* <HeroSlider /> */}
                {/* <OthersServices />
                {/* <ServiceBenefits /> */}
                {/* <AutomationOverview /> */}
                {/* <FaqSection />  */}

                <HomeMarquee />
                <Hero />
                <SmartQuickLinks />
                <StepGuideline />

                <SpecialtyServices />
                <ServiceBenefits />
                <Testimonials />
                <AutomationOverview />
                <FAQSection />
                <StudentHelpline />
            </main>

        </div>
    );
};

export default CampusComputerPage;

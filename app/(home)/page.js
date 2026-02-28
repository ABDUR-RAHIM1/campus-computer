 import Hero from '@/components/HomePage/Hero';
import SmartQuickLinks from '@/components/HomePage/SmartQuickLink';
import StepGuideline from '@/components/HomePage/Guidline'; 
import ServiceBenefits from '@/components/HomePage/ServicesBenifit';
import Testimonials from '@/components/HomePage/Testimonial';
import StudentHelpline from '@/components/HomePage/StudentHelpline';
import HomeMarquee from '@/components/HomePage/Marque';
import AutomationOverview from '@/components/HomePage/Overview';
import FAQSection from '@/components/HomePage/Faq';
import SpecialtyServices from '@/components/HomePage/CollegeServices';

const CampusComputerPage = async () => {

    return (
        <div>

            <main> 
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

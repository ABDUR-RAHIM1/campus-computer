import { FaqSection } from '@/components/Faq';
import { Contact } from '@/components/Contact';
import AutomationOverview from '@/components/Overview';
import HeroSlider from '@/components/HeroSilder'; 
import HomeMarquee from '@/components/Marque';
import CollegeServices from '@/components/CollegeServices';
import ServiceBenefits from '@/components/ServiceBenefits';
import OthersServices from '@/components/OthersServices';

const CampusComputerPage = async () => {

    return (
        <div>

            <main>
                {/* Hero Section */}
                {/* <Hero /> */}
                <HeroSlider />
                <HomeMarquee />
                <CollegeServices />
                <ServiceBenefits />
                <OthersServices/>
                <AutomationOverview />
                <FaqSection />
                {/* Contact Section */}
                <Contact />
            </main>

        </div>
    );
};

export default CampusComputerPage;

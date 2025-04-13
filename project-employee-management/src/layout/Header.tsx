import HeroImage from "@/components/heroimage/HeroImage";
import Navbar from "@/components/navbar/Navbar";




const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            {/* <HeroImage/> */}
            <Navbar />
        </header>

    );
};

export default Header;
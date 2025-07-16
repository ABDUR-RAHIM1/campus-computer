export function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-16">
            <div className="container mx-auto px-4 text-center">
                <h3 className="text-xl font-semibold mb-2">Campus Computer</h3>
                <p className="text-sm text-gray-300 mb-2">
                    কলেজ বাজার, লালমনিরহাট | 📞 01321040273 / 01611530939
                </p>
                <p className="text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} ক্যাম্পাস কম্পিউটার. সর্বস্বত্ব সংরক্ষিত।
                </p>
            </div>
        </footer>
    );
}

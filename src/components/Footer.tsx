// components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-primary text-textLight py-2 mt-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center text-xs lg:text-sm">
                    <div className=" text-center md:text-left mb-2 md:mb-0">
                        &copy; {new Date().getFullYear()} Notes App
                    </div>
                    <div className="flex space-x-4">
                        <a
                            href="https://github.com/AntoineWtz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-textDark transition-colors"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://www.linkedin.com/in/antoine-wurtz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-textDark transition-colors"
                        >
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

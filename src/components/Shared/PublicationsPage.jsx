import React from 'react'

const PublicationsPage = ({ isSection = false }) => {
    const publications = [
    {
        title: "Environmental DNA (eDNA) dataset of foraminiferal diversity from mining-affected estuaries of Goa, India",
        authors: "Authors: Marine Research Team, CSIR-NIO. Published in Data in Brief, 2024.",
        imageUrl: "https://ars.els-cdn.com/content/image/1-s2.0-S2352340924005080-gr1.jpg",
        link: "https://www.sciencedirect.com/science/article/pii/S2352340924005080"
    },
    {
        title: "Unveiling diversity in inhabited and uninhabited reefs of the Lakshadweep archipelago, India using eDNA",
        authors: "Authors: Reef Ecology Team, CMLRE. Published in Frontiers in Marine Science, 2025.",
        imageUrl: "https://www.frontiersin.org/files/Articles/1592429/fmars-12-1592429-HTML-r1/image_m/fmars-12-1592429-g001.jpg",
        link: "https://www.frontiersin.org/journals/marine-science/articles/10.3389/fmars.2025.1592429/full"
    },
    {
        title: "Validation and assessment of Potential Fishing Zone (PFZ) advisories along Kerala coast, South India",
        authors: "Authors: CMFRI Research Team. Published in Indian Journal of Fisheries, 2024.",
        imageUrl: "https://ars.els-cdn.com/content/image/1-s2.0-S0195925525001507-ga1.jpg",
        link: "https://www.sciencedirect.com/science/article/abs/pii/S0195925525001507"
    },
    {
        title: "Marine Data Services at National Oceanographic Data Centre-India: Supporting ocean services and research",
        authors: "Authors: INCOIS Data Management Team. Published in Data Science Journal, 2018.",
        imageUrl: "https://storage.googleapis.com/jnl-up-j-dsj-files/journals/1/articles/784/submission/proof/784-10-3969-1-17-20180510.png",
        link: "http://datascience.codata.org/articles/10.5334/dsj-2018-011/galley/753/download/"
    },
    {
        title: "Integrated Taxonomic Information System: Building marine biodiversity databases for Indian Ocean",
        authors: "Authors: CMLRE Taxonomy Division. Published in CMLRE Technical Report, 2025.",
        imageUrl: "https://www.cmlre.gov.in/sites/default/files/uploadfiles/Ascorhynchus_levissimus_Loman-1908.png",
        link: "https://www.cmlre.gov.in/research-programs/completed-research-program/integrated-taxonomic-information-system"
    },
    {
        title: "Animal Discoveries 2023: New Species and New Records from India",
        authors: "Authors: Zoological Survey of India. Published in ZSI Compendium, 2023.",
        imageUrl: "https://www.civilsdaily.com/wp-content/uploads/2024/07/makdi.jpg.webp",
        link: "https://zsi.gov.in/uploads/documents/publications/hindi/Animal_Discoveries_2023_(2)_compressed2.pdf"
    },
    {
        title: "Bridging the gap: The integration of eDNA techniques and traditional trawl surveys for marine biodiversity assessment",
        authors: "Authors: Marine Ecology Research Group. Published in Frontiers in Marine Science, 2024.",
        imageUrl: "https://www.frontiersin.org/files/Articles/1289589/fmars-11-1289589-HTML/image_m/fmars-11-1289589-g001.jpg",
        link: "https://www.frontiersin.org/journals/marine-science/articles/10.3389/fmars.2024.1289589/full"
    },
    {
        title: "Satellite based potential fishing zone (PFZ) advisories: Impact assessment on fishing communities across Tamil Nadu and Puducherry",
        authors: "Authors: INCOIS Fisheries Team. Published in INCOIS Research Papers, 2024.",
        imageUrl: "https://incois.gov.in/images/services/pfz/SST.jpeg",
        link: "https://incois.gov.in/MarineFisheries/PfzAdvisory"
    }

    ];

    const WrapperComponent = isSection ? 'section' : 'div';
    const wrapperProps = isSection ? { className: "py-20 bg-[#161c1e]" } : { className: "min-h-[calc(100vh-200px)]" };

    return (
        <WrapperComponent {...wrapperProps}>
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12">Recent Publications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {publications.map((pub, index) => (
                         <div key={index} className="bg-[#1c2327] p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-6">
                            <div className="w-full md:w-1/3 h-48 md:h-auto bg-cover bg-center rounded-md" style={{ backgroundImage: `url("${pub.imageUrl}")` }}></div>
                            <div className="flex-1 flex flex-col gap-3">
                                <h3 className="text-lg font-bold">{pub.title}</h3>
                                <p className="text-sm text-[#9db0b9]">{pub.authors}</p>
                                <a 
                                    href={pub.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-auto flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 px-4 bg-[#283339] text-white text-sm font-medium leading-normal w-fit hover:bg-opacity-80 transition-all"
                                >
                                    <span className="truncate">Read More</span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </WrapperComponent>
    );
};

export default PublicationsPage;

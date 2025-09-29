import React from 'react'

const PublicationsPage = ({ isSection = false }) => {
    const publications = [
        {
            title: "A multi-faceted approach to understanding krill distribution",
            authors: "Authors: A. Sharma, B. Patel, C. Singh. Published in Journal of Marine Science, 2023.",
            imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNRrsGck8ObbItoUS2wXO6-I_TpGnsl3MhN2adPVb8r3hebCRfleSCkh5ve1BCTVebg5mYSGAyJcfttNbnfUJWE8zqRWShxiaDUaCwliExsKzQCvnuDxsrb5xUqg9I08OJinbiBqwxh5ryBXZZPQQYxWwg8Ai2mcOUHEEPrANB1eR-FS4Pf22uB64Phe8Jex6fwe0RXXBH9xGfeEYLYaDYMG0d0T0CUcqzpbVQB9p8H-kPASMUCutdgNi7ORF_FqTABK3ZL_-X7W7S"
        },
        {
            title: "Leveraging eDNA for Antarctic biodiversity monitoring",
            authors: "Authors: D. Verma, E. Kapoor, F. Mishra. Published in Oceanography Research, 2024.",
            imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDO2jMnuB7aVhZWpCCHe_RveV23_AZtfBXAASsBSAvBWotoSdSJGYq1uOlT39V2y0Z_8saEohbaIyAFHcx-9IOJBjonxqUBG0W2IKjt_HsudMP1jsot9JOMMsRmHDWRTvP6Kkt5yXgaAClXV_QBzwnmEnBBkuucpV-5D05yG2hsRRF5CYbkhFP5ASWn9fNDv_1FY2tF83QTZIN4Qnu6rtTP5vBpXgl8Q4NQ0JLhNVIFZ5yF2t7Kgzhxxg1DeoFmvQJhD-43IFQgM_u7"
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
                                <button className="mt-auto flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 px-4 bg-[#283339] text-white text-sm font-medium leading-normal w-fit hover:bg-opacity-80 transition-all">
                                    <span className="truncate">Read More</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </WrapperComponent>
    );
};

export default PublicationsPage;

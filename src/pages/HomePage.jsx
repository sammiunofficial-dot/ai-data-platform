import React from "react";
import DatabaseIcon from "../components/Icons/DatabaseIcon";
import ChartIcon from "../components/Icons/ChartIcon";
import SparkleIcon from "../components/Icons/SparkleIcon";
import PublicationsPage from "../components/Shared/PublicationsPage";
import SearchIcon from "../components/Icons/SearchIcon";

const HomePage = ({ setRoute }) => {
    return (
        <>
            {/* Hero Section */}
            <section className="relative py-24 md:py-32">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(17, 22, 24, 0.9) 0%, rgba(17, 22, 24, 0.7) 50%, rgba(17, 22, 24, 0.9) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuC_tW0S-iKqPsM-sCR1Jm7_jTwVK4dFR5NSLzVTK8TEyjVoUzDHe3Cliojy7c3HFVjBKQNlprJG4WCH8e25uuugmYQDcUENEPQzxbPOdkZwNBfH-rrwN_Mt8Hs63RwejKPOoyUr-HVNfRQ7DrMSLReWOuzQxRRhFMSLYQ87tla90zzMnCaEaqLVoLUndtrsDG-1NO8b-uc2LA-MsE-scO4_h1SE2CIJcV3ynh7RQfcXRTzvcI1jMjkBHBlJyA3BAZD1zDPlReNbWXWu")` }}></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tighter mb-4">AI-Driven Marine Data Platform</h1>
                    <p className="text-lg md:text-xl text-[#9db0b9] max-w-3xl mx-auto mb-8">Unlocking the mysteries of the ocean through unified data, cross-domain analysis, and AI-powered insights.</p>
                    <div className="flex-wrap gap-4 flex justify-center">
                        <button onClick={() => setRoute('explore')} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-12 px-6 bg-[#1193d4] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-all">
                            <span className="truncate">Explore Data</span>
                        </button>
                        <button onClick={()=> setRoute('Request Access')} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-12 px-6 bg-[#283339] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-all">
                            <span className="truncate">Request Access</span>
                        </button>
                        <button onClick={() => setRoute('api-docs')} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-12 px-6 border border-[#283339] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#283339] transition-all">
                            <span className="truncate">API Docs</span>
                        </button>
                        <button onClick={() => setRoute('demo')} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-12 px-6 border border-[#283339] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#283339] transition-all">
                            <span className="truncate">Demo</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-[#161c1e]">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12 text-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="text-[#1193d4] flex items-center justify-center rounded-full bg-[#283339] shrink-0 size-16">
                                <DatabaseIcon />
                            </div>
                            <h3 className="text-xl font-bold">Unified Data</h3>
                            <p className="text-[#9db0b9]">Integrate diverse datasets into a single, searchable platform.</p>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <div className="text-[#1193d4] flex items-center justify-center rounded-full bg-[#283339] shrink-0 size-16">
                                <ChartIcon />
                            </div>
                            <h3 className="text-xl font-bold">Cross-Domain Analysis</h3>
                            <p className="text-[#9db0b9]">Analyze data across oceanography, taxonomy, and genomics.</p>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <div className="text-[#1193d4] flex items-center justify-center rounded-full bg-[#283339] shrink-0 size-16">
                                <SparkleIcon />
                            </div>
                            <h3 className="text-xl font-bold">AI-Enabled Insights</h3>
                            <p className="text-[#9db0b9]">Leverage AI to uncover hidden patterns and insights in marine data.</p>
                        </div>
                    </div>
                </div>
            </section>

             {/* Stats and Search Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
                        <div className="bg-[#1c2327] p-6 rounded-lg">
                            <p className="text-3xl font-bold text-[#1193d4]">12,500+</p>
                            <p className="text-[#9db0b9]">Datasets Indexed</p>
                        </div>
                        <div className="bg-[#1c2327] p-6 rounded-lg">
                            <p className="text-3xl font-bold text-[#1193d4]">350+</p>
                            <p className="text-[#9db0b9]">Cruises</p>
                        </div>
                        <div className="bg-[#1c2327] p-6 rounded-lg">
                            <p className="text-3xl font-bold text-[#1193d4]">8,000+</p>
                            <p className="text-[#9db0b9]">Species</p>
                        </div>
                        <div className="bg-[#1c2327] p-6 rounded-lg">
                            <p className="text-3xl font-bold text-[#1193d4]">1.2M+</p>
                            <p className="text-[#9db0b9]">Sequences</p>
                        </div>
                        <div className="bg-[#1c2327] p-6 rounded-lg col-span-2 md:col-span-1 lg:col-span-1">
                            <p className="text-3xl font-bold text-[#1193d4]">500+</p>
                            <p className="text-[#9db0b9]">Visualizations</p>
                        </div>
                    </div>
                    <div className="mt-16 max-w-2xl mx-auto">
                        <label className="flex flex-col min-w-40 h-14 w-full">
                            <div className="flex w-full flex-1 items-stretch rounded-md h-full">
                                <div className="text-[#9db0b9] flex border-none bg-[#283339] items-center justify-center pl-4 rounded-l-md border-r-0">
                                    <SearchIcon />
                                </div>
                                <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#1193d4] border-none bg-[#283339] h-full placeholder:text-[#9db0b9] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal" placeholder="Search by species name, station ID, or dataset..." />
                            </div>
                        </label>
                    </div>
                </div>
            </section>

             {/* Teasers Section */}
            <section className="py-20 bg-[#161c1e]">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">Interactive Teasers</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="group relative overflow-hidden rounded-lg">
                            <div className="w-full h-64 bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuALshUQQS7Rfs5a3JK5bTMwOYkwIXdRran14h5fdPllVQQqJq_87B3XebOv9yIbhpX9Hti-xZAaGsyHII9OjXWFzRxVWHtX0dgNfFt1qqiTO__Q92K5SMZfDLP5vD_vfSSJmLtLSke5uoiZxj4OaQtRUzOHpM91k6WU3c0vAwlqRNLDE8af4a9jtz50fZH5oWYForNLQPsxXMyhR1TvQjGx-z1DPNNhkwb0x-azAKGM_bgAKlyYbN--WqAitsDoQqSgc9Cr3FmFEt6B")` }}></div>
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <h3 className="text-white text-xl font-bold">Map Snapshot</h3>
                            </div>
                        </div>
                        <div className="group relative overflow-hidden rounded-lg">
                            <div className="w-full h-64 bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCE0-DCxytTacY1qltXVuaaVVhWB18i9c0henr-E7OogzAOwlxapl_qkzcYpuTOeoEBL91E8BOWPyw5kaNTEtoJsTZjBuFUqnwUAtOOAQfYO-qQz980Lf2OXScsMJ3meHq-aD4JsN1ybWqXtVJyqcNKi2zgYYyWKcl3MvL761w3mUmk4nB3y5ViJ0AHu7TlLWnA6PeT5l_ey_g0PWmCZm01NwA0sV0euSWddcT6p15P5z24cgrjZ3UrnVQCxqNRQheW9-N-9kdxWHrM")` }}></div>
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <h3 className="text-white text-xl font-bold">Trending Species Heatmap</h3>
                            </div>
                        </div>
                        <div className="group relative overflow-hidden rounded-lg">
                            <div className="w-full h-64 bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCoEdCPXa7Rw_gbox47k52fPu8K9LsKalL9sYzPsjbDG-ksP_kN4sQ_LOrcalM6QfJfYVaoSa4R5EfOpAD-pjBI4JzTomZ2CstK4ihXZI4QF7c4iun8jKuyTuEQBP38AD9e2WUV080Pe2j8ZboTdmY1KF3CtNCnidwwY6YnEA5r3FC1HM0VqPgfaH1bhSKrqV4QtDX_iltFfleX0zKFZRb-UWTxsyoAdbqBh-XyFT_joV8MLKN07kgX_3-80LRfz22ls3vHzALAkI__")` }}></div>
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <h3 className="text-white text-xl font-bold">Time-Series Thumbnail</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             {/* Featured Modules Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">Featured Modules</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        <div className="flex flex-col md:flex-row items-stretch justify-between gap-6 rounded-lg bg-[#1c2327] p-6 shadow-lg">
                            <div className="flex flex-col gap-4 flex-1">
                                <h3 className="text-xl font-bold">Oceanography</h3>
                                <p className="text-[#9db0b9]">Explore oceanographic data including temperature, salinity, and currents.</p>
                                <button className="flex mt-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 px-4 bg-[#283339] text-white text-sm font-medium leading-normal w-fit hover:bg-opacity-80 transition-all">
                                    <span className="truncate">Explore</span>
                                </button>
                            </div>
                            <div className="w-full md:w-1/2 h-48 md:h-auto bg-center bg-no-repeat aspect-video bg-cover rounded-lg" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDaCrIc9EyxA1HFBj79mln8NwbrUFdnZIUEDtwBveK6Bh7VZN37JKVogXdEKD4dQKpk395lXSkofLpEJ_wB7UZY0nYR7zzO-QYZpdSyGPMCwFafjmdbzy3DQEvRNkV3ahh5dmO7CiX1xJg-z03Lv4s3kvZL8El9d8hYjrdj0MroAmwgIsJj2qsZMWSmNQQzqoT45pZH10NAOTWnHWh4Qbi7mKeEi-jhT1OnFtoAF5FsXlImRIayqembqQA4sZqee3SSisX7T2wraHub")` }}></div>
                        </div>
                        <div className="flex flex-col md:flex-row items-stretch justify-between gap-6 rounded-lg bg-[#1c2327] p-6 shadow-lg">
                            <div className="flex flex-col gap-4 flex-1">
                                <h3 className="text-xl font-bold">Taxonomy</h3>
                                <p className="text-[#9db0b9]">Access taxonomic information on marine species, including classifications and distributions.</p>
                                <button className="flex mt-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 px-4 bg-[#283339] text-white text-sm font-medium leading-normal w-fit hover:bg-opacity-80 transition-all">
                                    <span className="truncate">Explore</span>
                                </button>
                            </div>
                            <div className="w-full md:w-1/2 h-48 md:h-auto bg-center bg-no-repeat aspect-video bg-cover rounded-lg" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAAul3Qqk6-LNNsW4m_DS2UNLjoEOpZJAqtQy2vL_lNEJ_8x2S821fggDKELbcPo2_6OVn18d5bsB_qI1m68aKc1w4QzSkveBHg6W1QHJFIdEApvveAqL4gS5NTxMLQb0Z9kRgRL9U8yVXDpe_PNIUdCe5VJSE2EQjCvLcnJyE7gg3-Wy7W7J1ngP05NKvxDjfHYYeLOOWuNtrRW9x_oY-IH1vHJZ8RAVcLlhTDxAwlTpSmRaXCGSJGfMkCz4wKwbLuvHKhcQsS-blH")` }}></div>
                        </div>
                        <div className="flex flex-col md:flex-row items-stretch justify-between gap-6 rounded-lg bg-[#1c2327] p-6 shadow-lg">
                            <div className="flex flex-col gap-4 flex-1">
                                <h3 className="text-xl font-bold">Otoliths</h3>
                                <p className="text-[#9db0b9]">Analyze otolith data for fish age and growth studies.</p>
                                <button className="flex mt-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 px-4 bg-[#283339] text-white text-sm font-medium leading-normal w-fit hover:bg-opacity-80 transition-all">
                                    <span className="truncate">Explore</span>
                                </button>
                            </div>
                            <div className="w-full md:w-1/2 h-48 md:h-auto bg-center bg-no-repeat aspect-video bg-cover rounded-lg" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuC3hfc09Q4LVIy06kDRKPO3u91gF2QOK5fnuHVVaUZIexY4v3k-8sPYycN6G8Xph5Y22Isr5IHV0qJbNYueuxaWE3enRlocCDdv2QiP1kTJwnSg37IZuH4VwcBB5ULRjI7XvGY7hyKTkRhFpkRvBb0CRGlzfT-cYuXZfXCwr0FZ5kioskOI4KXRO9iD3_sQW3aO_eKmQ0kkXCLgoqtuqLtU5QIbSqAIRG5kP91DIWCniK6TAY-HGetHaprnQwJpBrPcuHpVRuCoLVuo")` }}></div>
                        </div>
                        <div className="flex flex-col md:flex-row items-stretch justify-between gap-6 rounded-lg bg-[#1c2327] p-6 shadow-lg">
                            <div className="flex flex-col gap-4 flex-1">
                                <h3 className="text-xl font-bold">eDNA</h3>
                                <p className="text-[#9db0b9]">Investigate environmental DNA data to understand species presence and biodiversity.</p>
                                <button className="flex mt-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 px-4 bg-[#283339] text-white text-sm font-medium leading-normal w-fit hover:bg-opacity-80 transition-all">
                                    <span className="truncate">Explore</span>
                                </button>
                            </div>
                            <div className="w-full md:w-1/2 h-48 md:h-auto bg-center bg-no-repeat aspect-video bg-cover rounded-lg" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAZRYEoKhEQklaNj49ynqS28Mfkn_QO62UHvQn1xLfPTW67EyJHqd4rVveV8Basja1kkP-w1Mrk-ex3My93xARcyg8lQ7GO1l1qDh6FDQiBhUe6MQnOtoUd40sMl5Z22mtzlckkNWbbSzLxXV7WETN8XfgMZQz2UOYTOPMY-wsdQ-qYsGHEGd5vFUxqftHpUdjUfQDGqZ-0IKpkBpkBb3dundqHPljTKrK0P93nLrqE0uykrtBQhdir1h6HaNB_DGFZKz64yS4Ae1G4")` }}></div>
                        </div>
                    </div>
                </div>
            </section>
            
            <PublicationsPage isSection={true} />
        </>
    )
};

export default HomePage;

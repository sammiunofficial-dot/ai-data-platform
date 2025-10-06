import React from 'react';
import RequestAccess from './RequestAccess'; // Make sure the path is correct

const datasets = [
  {
    id: 'OCEAN_PHY_001',
    title: 'Indian Ocean Sea Surface Temperature (SST) Anomaly',
    description: 'A 20-year time-series dataset of physical oceanographic parameters, focusing on SST variations in the Northern Indian Ocean.',
    lastUpdated: '2025-09-15',
    tags: ['Oceanography', 'Climate', 'Physical Data'],
  },
  {
    id: 'FISH_TRWL_004',
    title: 'Arabian Sea Demersal Fish Trawl Survey Data',
    description: 'Comprehensive species abundance, biomass, and length-frequency data from bottom trawl surveys conducted from 2018-2024.',
    lastUpdated: '2025-08-22',
    tags: ['Fisheries', 'Trawl Survey', 'Biodiversity'],
  },
  {
    id: 'EDNA_MNG_002',
    title: 'eDNA Barcoding of Mangrove Ecosystems in Sundarbans',
    description: 'Metabarcoding results (18S rRNA) for assessing fish and invertebrate biodiversity from water samples in the Sundarbans mangrove delta.',
    lastUpdated: '2025-09-01',
    tags: ['eDNA', 'Molecular', 'Biodiversity', 'Mangrove'],
  },
  {
    id: 'OTOLITH_SCIA_007',
    title: 'Otolith Image Repository for Indian Sciaenidae',
    description: 'A high-resolution image collection of otoliths from commercially important croakers and drums, complete with morphometric data.',
    lastUpdated: '2025-07-30',
    tags: ['Otolith', 'Morphology', 'Taxonomy'],
  },
  {
    id: 'CHEM_NUTRI_003',
    title: 'Bay of Bengal Nutrient & Chlorophyll Database',
    description: 'Dataset containing measurements of nitrates, phosphates, silicates, and chlorophyll-a concentrations across various depths.',
    lastUpdated: '2025-08-05',
    tags: ['Oceanography', 'Chemical', 'Primary Productivity'],
  },
  {
    id: 'ACOUSTIC_PEL_005',
    title: 'Acoustic Backscatter Data for Pelagic Biomass',
    description: 'Echosounder data for estimating the biomass and distribution of small pelagic fish schools in the Indian EEZ.',
    lastUpdated: '2025-06-18',
    tags: ['Fisheries', 'Acoustics', 'Biomass'],
  },
  {
    id: 'GEN_COI_009',
    title: 'COI Gene Sequences for Marine Fish of India',
    description: 'A curated database of Cytochrome c oxidase I (COI) DNA barcodes for species identification of marine fishes from Indian waters.',
    lastUpdated: '2025-09-10',
    tags: ['Molecular', 'Genetics', 'Taxonomy'],
  },
  {
    id: 'BENTHIC_DIV_006',
    title: 'Benthic Diversity from Andaman & Nicobar Islands',
    description: 'Species occurrence and abundance data for benthic macrofauna collected via grab and core sampling around the Andaman archipelago.',
    lastUpdated: '2025-05-25',
    tags: ['Biodiversity', 'Benthos', 'Ecology'],
  },
  {
    id: 'MODEL_ECO_001',
    title: 'Ecosystem Model Parameters for the Malabar Upwelling',
    description: 'A collection of input parameters and validation data for ecosystem models (e.g., Ecopath with Ecosim) for the Southwest coast of India.',
    lastUpdated: '2025-04-11',
    tags: ['Modeling', 'Ecosystem', 'Simulation'],
  },
  {
    id: 'PHYTO_PLNK_008',
    title: 'Phytoplankton Species Composition (HPLC)',
    description: 'High-Performance Liquid Chromatography (HPLC) pigment data used to determine phytoplankton community structure.',
    lastUpdated: '2025-07-21',
    tags: ['Primary Productivity', 'Plankton', 'Ecology'],
  },
];


const ExploreData = () => {
  return (
    <div className="bg-#0b1220 text-white min-h-screen p-4 sm:p-8">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">Explore Datasets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {datasets.map((dataset) => (
            <div key={dataset.id} className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col border border-gray-700 hover:border-blue-500 transition-all">
              <h3 className="text-xl font-semibold text-blue-300 mb-2">{dataset.title}</h3>
              <p className="text-gray-400 mb-4 flex-grow">{dataset.description}</p>
              
              <div className="mb-4 flex flex-wrap gap-2">
                {dataset.tags.map(tag => (
                  <span key={tag} className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* === UPDATED FOOTER SECTION === */}
              <div className="flex flex-col sm:flex-row justify-between items-center mt-auto pt-4 border-t border-gray-700">
                <p className="text-sm text-gray-500 mb-4 sm:mb-0">Last Updated: {dataset.lastUpdated}</p>
                
                {/* Button Group Wrapper */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert('You have no access, kindly send required form')}
                    className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out shadow-md"
                  >
                    Explore Data
                  </button>
                  <RequestAccess datasetId={dataset.id} datasetTitle={dataset.title} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreData;
import React, { useState, useMemo } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// --- Expanded Mock Data (Remains the same) ---
const mockTaxonomicData = {
  sample1: [
    { rank: 'Phylum', name: 'Proteobacteria', count: 4500 },
    { rank: 'Phylum', name: 'Firmicutes', count: 3200 },
    { rank: 'Phylum', name: 'Actinobacteria', count: 1500 },
    { rank: 'Phylum', name: 'Bacteroidetes', count: 800 },
    { rank: 'Phylum', name: 'Verrucomicrobia', count: 50 },
  ],
  sample2: [
    { rank: 'Phylum', name: 'Proteobacteria', count: 2500 },
    { rank: 'Phylum', name: 'Firmicutes', count: 5200 },
    { rank: 'Phylum', name: 'Actinobacteria', count: 1100 },
    { rank: 'Phylum', name: 'Bacteroidetes', count: 1800 },
    { rank: 'Phylum', name: 'Cyanobacteria', count: 300 },
  ],
  sample3: [
    { rank: 'Phylum', name: 'Proteobacteria', count: 6500 },
    { rank: 'Phylum', name: 'Bacteroidetes', count: 2800 },
    { rank: 'Phylum', name: 'Actinobacteria', count: 400 },
    { rank: 'Phylum', name: 'Cyanobacteria', count: 1200 },
    { rank: 'Phylum', name: 'Marinimicrobia', count: 900 },
  ],
};

const mockAlphaDiversity = {
  sample1: { shannon: 3.1, chao1: 150 },
  sample2: { shannon: 2.8, chao1: 120 },
  sample3: { shannon: 3.5, chao1: 180 },
};

// --- React Component with Tailwind CSS ---
const EDNAAnalysisDashboard = () => {
  const [selectedSample, setSelectedSample] = useState('sample1');
  const selectedSampleData = mockTaxonomicData[selectedSample];

  // Memoized calculation for Core Microbiome
  const coreMicrobiome = useMemo(() => {
    const sets = Object.values(mockTaxonomicData).map(sampleData => new Set(sampleData.map(t => t.name)));
    const [firstSet, ...otherSets] = sets;
    return [...firstSet].filter(phylum => otherSets.every(set => set.has(phylum)));
  }, []);

  // Data for single-sample pie chart
  const abundancePieChartData = {
    labels: selectedSampleData.map((d) => d.name),
    datasets: [{
      data: selectedSampleData.map((d) => d.count),
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796'],
      borderColor: '#ffffff',
      borderWidth: 2,
    }],
  };

  // Data for comparative bar chart (Differential Abundance)
  const allPhyla = [...new Set(Object.values(mockTaxonomicData).flat().map(t => t.name))];
  const differentialAbundanceData = {
    labels: allPhyla,
    datasets: Object.keys(mockTaxonomicData).map((sampleKey, index) => ({
      label: `Sample ${index + 1}`,
      data: allPhyla.map(phylum => {
        const taxon = mockTaxonomicData[sampleKey].find(t => t.name === phylum);
        const totalReads = mockTaxonomicData[sampleKey].reduce((sum, t) => sum + t.count, 0);
        return taxon ? (taxon.count / totalReads) * 100 : 0; // Return relative abundance (%)
      }),
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'][index],
    })),
  };

  return (
    <div className="font-sans text-black bg-gray-100 p-5 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">🔬 16S rRNA eDNA Analysis Dashboard</h1>
          <p className="text-lg text-gray-700">An interactive tool to visualize and compare microbial community data from eDNA samples.</p>
        </header>

        {/* 1. Bioinformatics Workflow Overview */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">1. Bioinformatics Workflow Overview</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-800 leading-relaxed">
              Raw sequencing data (FASTQ files) first undergoes rigorous <strong>Quality Control (QC)</strong> to assess read quality. Following QC, reads are processed through a pipeline like <strong>DADA2</strong> or <strong>QIIME 2</strong> to denoise the data, remove errors, and generate an <strong>Amplicon Sequence Variant (ASV)</strong> table. Each ASV is then assigned a taxonomy by comparing it to reference databases like SILVA. The final output is a feature table mapping ASV counts to each sample.
            </p>
          </div>
        </section>

        {/* 2. Single Sample Analysis Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">2. Single Sample Composition</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-6">
              <label htmlFor="sample-select" className="font-bold text-gray-800 mr-3">Select Sample to Analyze:</label>
              <select
                id="sample-select"
                value={selectedSample}
                onChange={(e) => setSelectedSample(e.target.value)}
                className="p-2 border border-gray-300 rounded-md bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="sample1">Water Sample (River Ganga)</option>
                <option value="sample2">Soil Sample (Himalayan Foothills)</option>
                <option value="sample3">Marine Sediment (Andaman Sea)</option>
              </select>
            </div>
            <h3 className="text-xl font-semibold text-center mb-4">Relative Abundance of Phyla in {selectedSample}</h3>
            <div className="max-w-md mx-auto">
              <Pie data={abundancePieChartData} options={{ responsive: true, plugins: { legend: { position: 'right' } } }} />
            </div>
          </div>
        </section>
        
        {/* 3. Comparative Analysis Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">3. Comparative Analysis</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Core Microbiome</h3>
              <p className="text-gray-700 mb-4">Taxa found across <strong>all</strong> analyzed samples, representing key members of the ecosystems.</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-800">
                {coreMicrobiome.map(phylum => <li key={phylum}>{phylum}</li>)}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Alpha Diversity (Within-sample)</h3>
              <p className="text-gray-700 mb-4">Compares ecological diversity within each sample.</p>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b-2 p-2 bg-gray-50">Sample</th>
                    <th className="border-b-2 p-2 bg-gray-50">Shannon Index</th>
                    <th className="border-b-2 p-2 bg-gray-50">Chao1 (Richness)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(mockAlphaDiversity).map(key => (
                    <tr key={key} className="hover:bg-gray-50">
                      <td className="border-b p-2 font-medium">{key}</td>
                      <td className="border-b p-2">{mockAlphaDiversity[key].shannon}</td>
                      <td className="border-b p-2">{mockAlphaDiversity[key].chao1}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-3">Differential Abundance Analysis</h3>
            <p className="text-gray-700 mb-4">This chart compares the relative abundance (%) of major phyla across all samples, highlighting differences in community structure.</p>
            <Bar 
              data={differentialAbundanceData} 
              options={{ responsive: true, scales: { y: { title: { display: true, text: 'Relative Abundance (%)' } } }, plugins: { legend: { position: 'top' } } }} 
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Beta Diversity (Between-samples)</h3>
            <p className="text-gray-700 leading-relaxed">
              Beta diversity measures community dissimilarity between samples. It's often visualized using a <strong>Principal Coordinate Analysis (PCoA)</strong> plot, where each point represents a sample. Points closer together are more similar.
              <br />
              <strong className="block mt-2">Conceptual Interpretation:</strong> We'd expect a PCoA plot to show the Soil and Water samples as distinct clusters, with the Marine sample even further apart, reflecting their unique environments.
            </p>
            <div className="mt-4 p-4 border rounded-md bg-gray-50 text-center text-gray-600">
              
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EDNAAnalysisDashboard;
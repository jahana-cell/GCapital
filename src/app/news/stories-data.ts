// src/app/news/stories-data.ts

export type Story = {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string; 
  category: string;
  author: string;
  image: string;
  aiHint?: string;
  imagePosition?: string;
  videoUrl?: string;
  pdfUrl?: string;
  summary?: string;
  content?: string;       
  status?: 'Published' | 'Coming Soon';
  isFeatured?: boolean;
};

export const storiesData: Omit<Story, 'id' | 'slug'>[] = [
  // STORY 1: Comparative Market Analysis (Mobile Optimized)
  {
    title: 'Comparative Market Analysis: Fourplex Development in Atlanta vs. Memphis',
    description: 'A comprehensive data-driven report evaluating development costs, rental income potential, and financial viability (DSCR) for new fourplex construction in 2025.',
    date: '2026-01-27',
    category: 'Market Analysis',
    author: 'Ryan Kelley',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
    aiHint: 'architectural blueprints and financial data on a desk',
    imagePosition: 'center',
    isFeatured: true,
    status: 'Published',
    content: `
      <h2>1.0 Introduction and Strategic Overview</h2>
      <p>This report presents a data-driven comparison of Atlanta, Georgia, and Memphis, Tennessee, as potential markets for new fourplex developments. Each market is evaluated using key investment criteria: development costs, rental income potential, and overall financial viability. The analysis uses 2025 estimates to identify which market offers the best balance of entry cost, operational cash flow, and potential profitability.</p>
      <p>The analysis starts with an overview of each city's economic and cultural landscape, followed by projected construction and development costs. Investment performance for a standard fourplex is modeled using Net Operating Income (NOI) and Debt Service Coverage Ratio (DSCR). The report concludes with a detailed analysis of Memphis and a targeted profitability strategy.</p>
      <p>This structure provides GrowShare Capital with a clear framework for informed decision-making, consistently referencing the core decision metric.</p>

      <h2>2.0 High-Level Market Profile Comparison</h2>
      <p>Before looking at the financial data, it is important to consider how economic and lifestyle factors in Atlanta and Memphis affect long-term tenant demand, rental growth, and property values. The tables below highlight each city's main features and fourplex market conditions.</p>

      <h3>Market Snapshot</h3>
      <div class="overflow-x-auto w-full my-6 border border-neutral-200 rounded-lg shadow-sm">
        <table class="w-full text-left border-collapse min-w-[600px]">
          <thead class="bg-neutral-100 text-[#1a1a1a]">
            <tr>
              <th class="p-3 sm:p-4 font-bold border-b border-neutral-200 w-1/4">Category</th>
              <th class="p-3 sm:p-4 font-bold border-b border-neutral-200 w-1/3">Atlanta, GA</th>
              <th class="p-3 sm:p-4 font-bold border-b border-neutral-200 w-1/3">Memphis, TN</th>
            </tr>
          </thead>
          <tbody class="text-sm text-neutral-700">
            <tr class="border-b border-neutral-100">
              <td class="p-3 sm:p-4 font-semibold align-top">Key Economic Drivers</td>
              <td class="p-3 sm:p-4 align-top">Thriving job market in tech, finance, and entertainment.</td>
              <td class="p-3 sm:p-4 align-top">Market profile emphasizes lifestyle and affordability over specific industry drivers.</td>
            </tr>
            <tr class="border-b border-neutral-100">
              <td class="p-3 sm:p-4 font-semibold align-top">Cultural & Lifestyle Appeal</td>
              <td class="p-3 sm:p-4 align-top">Rich history, vibrant cultural scene, museums, festivals, and extensive park systems.</td>
              <td class="p-3 sm:p-4 align-top">Rich musical heritage (Beale Street), diverse cuisine (BBQ/Soul Food), and Mississippi River access.</td>
            </tr>
            <tr class="border-b border-neutral-100">
              <td class="p-3 sm:p-4 font-semibold align-top">Cost of Living</td>
              <td class="p-3 sm:p-4 align-top">Relatively low cost of living compared to other major cities.</td>
              <td class="p-3 sm:p-4 align-top">Low cost of living and affordable housing provide great value.</td>
            </tr>
            <tr class="bg-neutral-50 font-medium">
              <td class="p-3 sm:p-4 align-top">Median Fourplex Cost</td>
              <td class="p-3 sm:p-4 align-top whitespace-nowrap">$530,000 <span class="text-xs font-normal text-neutral-500 block">(2,836 sq ft)</span></td>
              <td class="p-3 sm:p-4 align-top whitespace-nowrap">$222,500 <span class="text-xs font-normal text-neutral-500 block">(3,881 sq ft)</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-sm text-neutral-500 italic mb-8">Scroll table horizontally to view full data on mobile.</p>

      <h2>3.0 Comparative Development Cost Analysis</h2>
      <p>Understanding Total Development Cost (TDC) is essential, as it determines the initial capital required and sets the cost basis for future profitability. The following analysis uses a standardized fourplex project to compare the Atlanta and Memphis metropolitan areas directly.</p>
      
      <div class="bg-neutral-50 p-5 rounded-lg border-l-4 border-[#D4AF37] my-6">
        <h4 class="font-bold mb-3 text-[#1a1a1a]">Baseline Project Assumptions:</h4>
        <ul class="list-disc pl-5 space-y-2 text-sm text-neutral-700">
            <li><strong>Building Type:</strong> 4-Plex (Townhome or Garden-style)</li>
            <li><strong>Unit Mix:</strong> Four (4) x 2BR / 2BA units</li>
            <li><strong>Average Unit Size:</strong> 950–1,050 SF</li>
            <li><strong>Total Gross Area:</strong> 4,000–4,200 SF</li>
            <li><strong>Finish Level:</strong> Workforce / Market-Rate</li>
        </ul>
      </div>

      <h3>3.1 Hard Construction Costs & TDC</h3>
      <p>Hard costs include the tangible aspects of construction, such as labor and materials. These costs account for the largest share of the development budget and are heavily influenced by local market conditions.</p>

      <div class="overflow-x-auto w-full my-6 border border-neutral-200 rounded-lg shadow-sm">
        <table class="w-full text-left border-collapse min-w-[600px]">
          <thead class="bg-neutral-100 text-[#1a1a1a]">
            <tr>
              <th class="p-3 font-bold border-b border-neutral-200">Cost Item</th>
              <th class="p-3 font-bold border-b border-neutral-200">Atlanta Metro</th>
              <th class="p-3 font-bold border-b border-neutral-200">Memphis Metro</th>
            </tr>
          </thead>
          <tbody class="text-sm text-neutral-700">
            <tr class="border-b border-neutral-100">
              <td class="p-3 font-semibold">Hard Costs</td>
              <td class="p-3">$740,000</td>
              <td class="p-3">$545,000</td>
            </tr>
            <tr class="border-b border-neutral-100">
              <td class="p-3">Architecture & Engineering</td>
              <td class="p-3">$55,000</td>
              <td class="p-3">$35,000</td>
            </tr>
            <tr class="border-b border-neutral-100">
              <td class="p-3">Permits, Impact & Utilities</td>
              <td class="p-3">$35,000 – $55,000</td>
              <td class="p-3">$15,000 – $25,000</td>
            </tr>
            <tr class="border-b border-neutral-100">
              <td class="p-3">Financing, Insurance, Legal</td>
              <td class="p-3">$45,000</td>
              <td class="p-3">$35,000</td>
            </tr>
            <tr class="border-b border-neutral-100">
              <td class="p-3">Contingency (7%)</td>
              <td class="p-3">$50,000</td>
              <td class="p-3">$38,000</td>
            </tr>
            <tr class="bg-[#1a1a1a] text-white font-bold">
              <td class="p-3">Total Development Cost</td>
              <td class="p-3 whitespace-nowrap">$925k – $975k</td>
              <td class="p-3 whitespace-nowrap">$670k – $720k</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <p>The analysis reveals a significant cost difference between the two markets, with Memphis’s projected TDC approximately $255,000 lower than Atlanta’s. This capital efficiency provides a strategic advantage by lowering the entry barrier and enabling the development of nearly three projects in Memphis for every two in Atlanta.</p>

      <h2>4.0 Investment Performance and Financial Viability</h2>
      <p>While development cost determines the initial investment, long-term financial viability depends on the project's ability to generate sufficient income to cover operating expenses and debt service.</p>
      
      <div class="my-6">
        <p class="font-bold text-[#1a1a1a] mb-2">Key Financial Assumptions:</p>
        <ul class="flex flex-wrap gap-2 text-sm text-neutral-600">
          <li class="bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200">75% LTV Loan</li>
          <li class="bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200">6.75% Interest</li>
          <li class="bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200">30-Year Amortization</li>
          <li class="bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200">7% Vacancy</li>
        </ul>
      </div>

      <div class="overflow-x-auto w-full my-6 border border-neutral-200 rounded-lg shadow-sm">
        <table class="w-full text-left border-collapse min-w-[500px]">
           <thead class="bg-neutral-100 text-[#1a1a1a]">
            <tr>
              <th class="p-3 font-bold border-b border-neutral-200">Metric</th>
              <th class="p-3 font-bold border-b border-neutral-200">Atlanta Metro</th>
              <th class="p-3 font-bold border-b border-neutral-200">Memphis Metro</th>
            </tr>
          </thead>
          <tbody class="text-sm text-neutral-700">
            <tr class="border-b border-neutral-100">
              <td class="p-3">Avg Rent / Unit / Month</td>
              <td class="p-3">$2,200</td>
              <td class="p-3">$1,250</td>
            </tr>
            <tr class="border-b border-neutral-100">
              <td class="p-3">Gross Annual Rent</td>
              <td class="p-3">$105,600</td>
              <td class="p-3">$60,000</td>
            </tr>
            <tr class="border-b border-neutral-100 font-semibold bg-neutral-50">
              <td class="p-3">Net Operating Income (NOI)</td>
              <td class="p-3">$68,500</td>
              <td class="p-3">$39,000</td>
            </tr>
            <tr class="border-b border-neutral-100">
              <td class="p-3">Annual Debt Service</td>
              <td class="p-3">$53,500</td>
              <td class="p-3">$36,000</td>
            </tr>
             <tr class="border-b border-neutral-100">
              <td class="p-3">Cash Flow (Annual)</td>
              <td class="p-3 font-bold text-green-600">$15,000</td>
              <td class="p-3 font-bold text-neutral-600">$3,000</td>
            </tr>
            <tr class="bg-[#D4AF37] text-white font-bold">
              <td class="p-3">DSCR</td>
              <td class="p-3">1.28</td>
              <td class="p-3">1.08</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>The analysis demonstrates a clear trade-off. The Atlanta project, despite higher development costs, generates significantly higher rental income, resulting in a 1.28 DSCR. In contrast, the Memphis project yields much thinner margins (1.08 DSCR), which generally requires additional incentives to meet conventional underwriting standards.</p>

      <h2>5.0 Memphis Deep Dive: A Pathway to Profitability</h2>
      <p>The expected 1.08 DSCR for the Memphis fourplex presents a significant challenge. This section examines the Memphis market in detail and provides a clear plan to reduce risk.</p>
      
      <h3>5.1 Strategic Cost Reduction via Value Engineering (VE)</h3>
      <p>To close the current viability gap, the project will transition from a premium specification to a Value-Engineered (VE) rental model. This approach aligns the Total Development Cost (TDC) with realistic exit values.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div class="bg-white p-4 border border-neutral-200 rounded shadow-sm">
            <h5 class="font-bold text-[#1a1a1a] mb-2">Shell Optimization</h5>
            <p class="text-sm text-neutral-600">Using slab-on-grade foundations and simple rectangular geometries to cut framing and concrete costs.</p>
          </div>
          <div class="bg-white p-4 border border-neutral-200 rounded shadow-sm">
            <h5 class="font-bold text-[#1a1a1a] mb-2">Utility & Finish</h5>
            <p class="text-sm text-neutral-600">Installing all-electric systems, PEX piping, and durable Luxury Vinyl Plank (LVP) flooring instead of tile.</p>
          </div>
      </div>
      
      <p>By swapping expensive finishes for durable alternatives, the project can save <strong>$45,000 to $60,000 per unit</strong>, improving the financial outlook and helping to ensure profitability.</p>

      <h2>6.0 Final Recommendations for GrowShare Capital</h2>
      <p>This analysis highlights the fundamental trade-off between the Atlanta and Memphis markets. Based on these findings, the following recommendations are provided.</p>
      
      <ol class="list-decimal pl-6 space-y-6 my-8">
        <li>
          <div class="pl-2">
            <strong class="text-[#1a1a1a] block mb-1">Evaluate Atlanta for a Higher-Capital, Lower-Risk Strategy.</strong>
            <span class="text-neutral-700">Atlanta is a straightforward investment offering a strong initial DSCR of 1.28. It is best suited for investors who prioritize stability and are willing to commit more capital upfront.</span>
          </div>
        </li>
        <li>
          <div class="pl-2">
            <strong class="text-[#1a1a1a] block mb-1">Pursue Memphis with a disciplined, value-engineered approach.</strong>
            <span class="text-neutral-700">Memphis offers a higher yield only if costs are controlled. Target a TDC of <strong>$580,000</strong> to achieve a developer profit of ~$95,000.</span>
          </div>
        </li>
        <li>
          <div class="pl-2">
            <strong class="text-[#1a1a1a] block mb-1">Leverage Key Memphis-Specific Optimizations.</strong>
            <span class="text-neutral-700">Verify with the Shelby County Assessor regarding the <strong>25% residential tax rate</strong>. This single action can reduce annual taxes by nearly $2,500 and increase valuation by approximately $35,000.</span>
          </div>
        </li>
      </ol>

      <div class="not-prose mt-16 pt-10 border-t border-neutral-200">
        <h2 class="text-2xl font-serif font-bold mb-8 text-[#1a1a1a]">About the Author</h2>
        <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-neutral-50 p-6 sm:p-8 rounded-lg border border-neutral-200">
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/growshare-capital.firebasestorage.app/o/profile%20pictures%2FRyan%20Kelly.png?alt=media&token=ec9d9c01-5329-4942-a5a2-333dcbcce376" 
              alt="Ryan Kelley" 
              class="w-24 h-24 rounded-full object-cover shrink-0 border border-neutral-300 shadow-sm" 
              style="object-position: top;" 
            />
            <div class="flex-1 text-center sm:text-left">
                <h3 class="text-xl font-bold text-[#1a1a1a]">Ryan Kelley</h3>
                <p class="text-sm text-[#D4AF37] font-bold uppercase tracking-widest mb-4">Director of Operations & Strategy</p>
                <div class="text-sm text-neutral-600 leading-relaxed space-y-4 font-light text-left">
                    <p>Ryan Kelley is an operations leader and impact strategist combining capital formation with technical execution. As Director of Operations & Development at Dar Un Noor School in Atlanta, GA, he leads revenue strategy and strategic partnerships.</p>
                    <p>Currently an Equity Partner at GrowShare Capital, Ryan leverages this intersection of fundraising, operations, and technology to build resilient infrastructure for high-impact investments.</p>
                </div>
            </div>
        </div>
      </div>
    `
  },
  // STORY 2: The Appointment of Ryan Kelley (Standard)
  {
    title: 'GrowShare Capital Appoints Ryan Kelley to Lead Operations & Strategy',
    description: 'This strategic move reinforces the operational backbone supporting the firm’s growing investment portfolio. Kelley enters the role with a resume that merges technical execution with the capital formation skills needed for impact-driven development.',
    date: '2026-01-16',
    category: 'Company News',
    author: 'GrowShare Capital',
    image: 'https://firebasestorage.googleapis.com/v0/b/growshare-capital.firebasestorage.app/o/profile%20pictures%2FRyan%20Kelly.png?alt=media&token=ec9d9c01-5329-4942-a5a2-333dcbcce376',
    aiHint: 'man portrait professional',
    imagePosition: 'top',
    isFeatured: false,
    status: 'Published',
    content: `
      <h2>Strengthening the Backbone of High-Impact Investment</h2>
      <p><strong>ATLANTA, GA</strong> — GrowShare Capital is pleased to announce the appointment of <strong>Ryan Kelley</strong> as Director of Operations & Strategy. This critical addition to the leadership team signals a strategic evolution for the firm as it scales its portfolio of workforce housing and community-focused developments across the Southeast.</p>

      <p>Kelley brings a unique resume that sits at the intersection of technical execution and capital formation—a rare combination that aligns perfectly with GrowShare's data-driven, impact-first thesis.</p>

      <h2>A Track Record of Execution</h2>
      <p>Prior to joining GrowShare, Kelley served as Director of Operations & Development at Dar Un Noor School in Atlanta. In that role, he was instrumental in stabilizing revenue streams, securing nearly $500,000 in restricted funding, and successfully increasing revenue reliability by 25% year-over-year. His tenure was marked by a modernization of operational infrastructure that allowed the institution to expand its reach and efficacy.</p>

      <p>His background in real estate is equally robust. Kelley previously oversaw critical readiness workflows for a <strong>$250 million residential portfolio</strong> at RESICAP. Operating at that scale requires a mastery of data governance and process efficiency—skills Kelley has honed through leadership roles in both FinTech and MedTech sectors.</p>

      <h2>Strategic Governance & Community Impact</h2>
      <p>Beyond his operational expertise, Kelley is a fixture in the Atlanta non-profit governance space. He currently supports multimillion-dollar capital initiatives, including a notable $5 million New Markets Tax Credit acquisition with the Global Village Project. His ability to navigate complex financial structures to benefit community organizations makes him an ideal steward for GrowShare's mission.</p>

      <blockquote>
        "Real estate is not just about the asset; it is about the infrastructure that supports it. Ryan's ability to merge high-level strategy with granular operational excellence is exactly what we need as we enter our next phase of growth."
        <br/><span class="text-sm text-neutral-500 not-italic">— Managing Partner, GrowShare Capital</span>
      </blockquote>

      <p>As an Equity Partner, Kelley will focus on building resilient internal infrastructure, optimizing asset management workflows, and spearheading new capital formation strategies. His appointment is effective immediately.</p>
    `
  }
];
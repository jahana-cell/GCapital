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
  // STORY 1: Comparative Market Analysis (Full Report Version)
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
      <div class="overflow-x-auto my-6 border border-neutral-200 rounded-lg">
        <table class="w-full text-left border-collapse min-w-[600px]">
          <thead class="bg-neutral-100 text-[#1a1a1a]">
            <tr>
              <th class="p-4 font-bold border-b border-neutral-200 w-1/4">Category</th>
              <th class="p-4 font-bold border-b border-neutral-200 w-1/3">Atlanta, GA</th>
              <th class="p-4 font-bold border-b border-neutral-200 w-1/3">Memphis, TN</th>
            </tr>
          </thead>
          <tbody class="text-sm text-neutral-700">
            <tr class="border-b border-neutral-100">
              <td class="p-4 font-semibold">Key Economic Drivers</td>
              <td class="p-4">Thriving job market in tech, finance, and entertainment.</td>
              <td class="p-4">Market profile emphasizes lifestyle and affordability over specific industry drivers.</td>
            </tr>
            <tr class="border-b border-neutral-100">
              <td class="p-4 font-semibold">Cultural & Lifestyle Appeal</td>
              <td class="p-4">Rich history, vibrant cultural scene, museums, festivals, and extensive park systems.</td>
              <td class="p-4">Rich musical heritage (Beale Street), diverse cuisine (BBQ/Soul Food), and Mississippi River access.</td>
            </tr>
            <tr class="border-b border-neutral-100">
              <td class="p-4 font-semibold">Cost of Living</td>
              <td class="p-4">Relatively low cost of living compared to other major cities.</td>
              <td class="p-4">Low cost of living and affordable housing provide great value.</td>
            </tr>
            <tr class="bg-neutral-50 font-medium">
              <td class="p-4">Median Fourplex Cost</td>
              <td class="p-4">$530,000 (2,836 sq ft)</td>
              <td class="p-4">$222,500 (3,881 sq ft)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>This overview highlights the main differences between the two markets. The following section examines the specific financial inputs required for new development in each city.</p>

      <h2>3.0 Comparative Development Cost Analysis</h2>
      <p>Understanding Total Development Cost (TDC) is essential, as it determines the initial capital required and sets the cost basis for future profitability. The following analysis uses a standardized fourplex project to compare the Atlanta and Memphis metropolitan areas directly.</p>
      
      <div class="bg-neutral-50 p-6 rounded-lg border-l-4 border-[#D4AF37] my-6">
        <h4 class="font-bold mb-2">Baseline Project Assumptions:</h4>
        <ul class="list-disc pl-5 space-y-1 text-sm text-neutral-700">
            <li><strong>Building Type:</strong> 4-Plex (Townhome or Garden-style)</li>
            <li><strong>Unit Mix:</strong> Four (4) x 2BR / 2BA units</li>
            <li><strong>Average Unit Size:</strong> 950–1,050 SF</li>
            <li><strong>Total Gross Area:</strong> 4,000–4,200 SF</li>
            <li><strong>Finish Level:</strong> Workforce / Market-Rate</li>
        </ul>
      </div>

      <h3>3.1 Hard Construction Costs</h3>
      <p>Hard costs include the tangible aspects of construction, such as labor and materials. These costs account for the largest share of the development budget and are heavily influenced by local market conditions.</p>

      <h3>3.2 Total Development Cost (TDC)</h3>
      <p>Total Development Cost includes all project expenses, from hard construction costs to soft costs like design fees, permits, financing, and contingency funds.</p>

      <div class="overflow-x-auto my-6 border border-neutral-200 rounded-lg">
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
              <td class="p-3">$925,000 – $975,000</td>
              <td class="p-3">$670,000 – $720,000</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>The analysis reveals a significant cost difference between the two markets, with Memphis’s projected TDC approximately $255,000 lower than Atlanta’s. This capital efficiency provides a strategic advantage by lowering the entry barrier and enabling the development of nearly three projects in Memphis for every two in Atlanta. The absence of impact fees in Memphis further reduces soft costs compared to more developed markets such as Atlanta.</p>

      <h2>4.0 Investment Performance and Financial Viability</h2>
      <p>While development cost determines the initial investment, long-term financial viability depends on the project's ability to generate sufficient income to cover operating expenses and debt service. This is best evaluated using two key metrics: <strong>Net Operating Income (NOI)</strong> and <strong>Debt Service Coverage Ratio (DSCR)</strong>.</p>
      
      <p><strong>Key Financial Assumptions:</strong></p>
      <ul class="list-disc pl-5 mb-4 text-sm text-neutral-700">
        <li>Loan Terms: 75% LTV, 6.75% interest, 30-year amortization</li>
        <li>Vacancy Rate: 7%</li>
        <li>Operating Expenses: 35% of Gross Rent</li>
      </ul>

      <div class="overflow-x-auto my-6 border border-neutral-200 rounded-lg shadow-sm">
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
              <td class="p-3">$15,000</td>
              <td class="p-3">$3,000</td>
            </tr>
            <tr class="bg-[#D4AF37] text-white font-bold">
              <td class="p-3">DSCR</td>
              <td class="p-3">1.28</td>
              <td class="p-3">1.08</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>The analysis demonstrates a clear trade-off. The Atlanta project, despite higher development costs, generates significantly higher rental income, resulting in a 1.28 DSCR and an annual pre-tax cash flow of $15,000. This outcome reflects a stable, financeable project with strong potential for asset appreciation.</p>
      <p>In contrast, the Memphis project yields much thinner margins. Its lower entry cost results in a 1.08 DSCR and only $3,000 in annual cash flow. A DSCR near 1.0 does not meet conventional underwriting standards and requires additional incentives, such as tax abatements or subordinate debt, to achieve financeability.</p>

      <h2>5.0 Memphis Deep Dive: A Pathway to Profitability</h2>
      <p>The expected 1.08 DSCR for the Memphis fourplex presents a significant challenge for investors seeking standard financing. This section examines the Memphis market in detail, quantifies the gap, and provides a clear plan to reduce risk and achieve a lender-acceptable DSCR.</p>
      
      <h3>5.1 The Viability Gap Analysis</h3>
      <p>A typical valuation approach starts with the lender’s required DSCR to determine the maximum loan amount and purchase price. This analysis shows that to achieve a 1.28 DSCR with market rents of $1,250 per unit, the maximum supportable property price is about $465,000, which is well below the projected development cost of $670,000 to $720,000. In summary, at the current TDC, the project does not match Memphis’s supportable debt and income levels, so it cannot be financed as is.</p>

      <h3>5.2 Strategic Cost Reduction via Value Engineering (VE)</h3>
      <p>To close the current viability gap, the project will transition from a premium specification to a Value-Engineered (VE) rental model. This approach aligns the Total Development Cost (TDC) with realistic exit values by prioritizing structural efficiency and durability over expensive finishes.</p>
      <p>The plan starts by optimizing the building shell, using a slab-on-grade foundation and a simple rectangular shape to cut framing and concrete costs. Exterior costs are reduced by choosing standard window sizes and a mix of vinyl siding with a brick accent rather than full masonry.</p>
      <p>Inside, the design focuses on lowering utility and turnover costs. The plan uses all-electric systems instead of natural gas, PEX piping with stacked wet walls, and durable Luxury Vinyl Plank (LVP) flooring. By swapping expensive finishes like quartz and tile for laminate countertops and fiberglass tubs, the project can save $45,000 to $60,000 per unit, improving the financial outlook and helping to ensure profitability.</p>

      <h2>6.0 Final Recommendations for GrowShare Capital</h2>
      <p>This analysis highlights the fundamental trade-off between the Atlanta and Memphis markets. Atlanta offers a higher-cost, higher-return profile with immediate financial stability, while Memphis provides a lower-cost entry point with higher initial risk but the potential for engineered profitability. Based on these findings, the following recommendations are provided.</p>
      
      <ol class="list-decimal pl-6 space-y-4 my-6">
        <li>
          <strong>Evaluate Atlanta for a Higher-Capital, Lower-Risk Strategy.</strong><br/>
          Atlanta is a straightforward investment, offering a strong initial DSCR of 1.28 and significant long-term appreciation potential. It is best suited for investors who prioritize stability and are willing to commit more capital upfront.
        </li>
        <li>
          <strong>Pursue Memphis with a disciplined, value-engineered approach.</strong><br/>
          Memphis offers a higher yield only if development costs are tightly controlled. The project should target a Total Development Cost of $580,000, reducing hard costs to about $450,000 ($125 per square foot).
        </li>
        <li>
          <strong>Leverage Key Memphis-Specific Optimizations.</strong><br/>
          Beyond construction cost control, success in Memphis requires leveraging local market nuances. It is important to verify with the Shelby County Assessor whether the property can be structured to achieve the residential (25%) rather than the commercial (40%) tax assessment rate.
        </li>
      </ol>

      <div class="not-prose mt-16 pt-10 border-t border-neutral-200">
        <h2 class="text-2xl font-serif font-bold mb-8 text-[#1a1a1a]">About the Author</h2>
        <div class="flex flex-col sm:flex-row items-start gap-8 bg-neutral-50 p-8 rounded-sm border border-neutral-200">
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/growshare-capital.firebasestorage.app/o/profile%20pictures%2FRyan%20Kelly.png?alt=media&token=ec9d9c01-5329-4942-a5a2-333dcbcce376" 
              alt="Ryan Kelley" 
              class="w-24 h-24 rounded-full object-cover shrink-0 border border-neutral-300 shadow-sm" 
              style="object-position: top;" 
            />
            <div class="flex-1">
                <h3 class="text-xl font-bold text-[#1a1a1a]">Ryan Kelley</h3>
                <p class="text-sm text-[#D4AF37] font-bold uppercase tracking-widest mb-4">Director of Operations & Strategy</p>
                <div class="text-sm text-neutral-600 leading-relaxed space-y-4 font-light">
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
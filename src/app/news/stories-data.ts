// src/app/news/stories-data.ts

export type Story = {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string; // Storing as YYYY-MM-DD string
  category: string;
  author: string;
  image: string;
  aiHint?: string;        // Optional: for AI image generation prompts
  imagePosition?: string;
  videoUrl?: string;
  pdfUrl?: string;
  summary?: string;
  content?: string;       // The full HTML content of the article
  status?: 'Published' | 'Coming Soon';
  isFeatured?: boolean;
};

// This array is the source of truth for the seeder.
export const storiesData: Omit<Story, 'id' | 'slug'>[] = [
  // STORY 1: Comparative Market Analysis (The New Report)
  {
    title: 'Comparative Market Analysis: Fourplex Development in Atlanta vs. Memphis',
    description: 'A data-driven evaluation of development costs, rental income potential, and financial viability for 2025 investment strategies.',
    date: '2026-01-27',
    category: 'Market Analysis',
    author: 'Ryan Kelley',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop', // Kept original image, or update as needed
    aiHint: 'architectural rendering of a modern townhome fourplex',
    imagePosition: 'center',
    isFeatured: true,
    status: 'Published',
    content: `
      <h2>1.0 Introduction and Strategic Overview</h2>
      <p>This report presents a data-driven comparison of Atlanta, Georgia, and Memphis, Tennessee, as potential markets for new fourplex developments. Each market is evaluated using key investment criteria: development costs, rental income potential, and overall financial viability.</p> 
      
      <p>The analysis uses 2025 estimates to identify which market offers the best balance of entry cost, operational cash flow, and potential profitability. </p>

      <h2>2.0 High-Level Market Profile Comparison</h2>
      <p>Before looking at the financial data, it is important to consider how economic and lifestyle factors in Atlanta and Memphis affect long-term tenant demand, rental growth, and property values. The table below highlights each city's main features.</p>

      <div class="overflow-x-auto my-8">
        <table class="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr class="border-b-2 border-neutral-200">
              <th class="py-3 font-bold text-[#1a1a1a] w-1/3">Category</th>
              <th class="py-3 font-bold text-[#1a1a1a] w-1/3">Atlanta, GA</th>
              <th class="py-3 font-bold text-[#1a1a1a] w-1/3">Memphis, TN</th>
            </tr>
          </thead>
          <tbody class="text-neutral-700 text-sm">
            <tr class="border-b border-neutral-100">
              <td class="py-3 font-semibold">Key Economic Drivers</td>
              <td class="py-3">Thriving job market in tech, finance, and entertainment.</td>
              <td class="py-3">Profile emphasizes lifestyle, logistics, and affordability over specific industry drivers.</td>
            </tr>
            <tr class="border-b border-neutral-100">
              <td class="py-3 font-semibold">Cultural & Lifestyle</td>
              <td class="py-3">Rich history, vibrant cultural scene, museums, and extensive park systems.</td>
              <td class="py-3">Rich musical heritage (Beale St), diverse cuisine (BBQ), and Mississippi River access.</td>
            </tr>
            <tr class="border-b border-neutral-100">
              <td class="py-3 font-semibold">Median 4-Plex Cost</td>
              <td class="py-3"><strong>$530,000</strong> (2,836 sq ft)</td>
              <td class="py-3"><strong>$222,500</strong> (3,881 sq ft)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>3.0 Comparative Development Cost Analysis</h2>
      <p>Understanding Total Development Cost (TDC) is essential, as it determines the initial capital required and sets the cost basis for future profitability. The following analysis uses a standardized fourplex project (4 x 2BR/2BA units) to compare the markets directly.</p>

      <h3>3.1 Hard Construction Costs & TDC</h3>
      <p>The analysis reveals a significant cost difference between the two markets, with Memphis’s projected TDC approximately <strong>$255,000 lower</strong> than Atlanta’s. This capital efficiency provides a strategic advantage by lowering the entry barrier.</p>

      <div class="overflow-x-auto my-8">
        <table class="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr class="border-b-2 border-neutral-200">
              <th class="py-3 font-bold text-[#1a1a1a]">Cost Item</th>
              <th class="py-3 font-bold text-[#1a1a1a]">Atlanta Metro</th>
              <th class="py-3 font-bold text-[#1a1a1a]">Memphis Metro</th>
            </tr>
          </thead>
          <tbody class="text-neutral-700">
            <tr class="border-b border-neutral-100 bg-neutral-50">
              <td class="py-3 pl-2 font-bold">Hard Costs</td>
              <td class="py-3">$740,000</td>
              <td class="py-3">$545,000</td>
            </tr>
            <tr class="border-b border-neutral-100">
              <td class="py-3 pl-2">Architecture & Eng.</td>
              <td class="py-3">$55,000</td>
              <td class="py-3">$35,000</td>
            </tr>
            <tr class="border-b border-neutral-100">
              <td class="py-3 pl-2">Permits, Impact & Utilities</td>
              <td class="py-3">$35k – $55k</td>
              <td class="py-3">$15k – $25k</td>
            </tr>
            <tr class="border-b border-neutral-100">
              <td class="py-3 pl-2">Financing & Legal</td>
              <td class="py-3">$45,000</td>
              <td class="py-3">$35,000</td>
            </tr>
            <tr class="border-t-2 border-neutral-800 font-bold text-[#D4AF37]">
              <td class="py-3 pl-2">Total Development Cost</td>
              <td class="py-3">$925k – $975k</td>
              <td class="py-3">$670k – $720k</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p><strong>Key Insight:</strong> The absence of impact fees in Memphis significantly reduces soft costs compared to more developed markets such as Atlanta.</p>

      <h2>4.0 Investment Performance and Financial Viability</h2>
      <p>While development cost determines the initial investment, long-term financial viability depends on the project's ability to generate sufficient income. We modeled this using a <strong>75% LTV loan at 6.75% interest</strong>.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div class="bg-neutral-50 p-6 rounded border border-neutral-200">
          <h4 class="font-bold text-lg mb-4 text-[#1a1a1a]">Atlanta: High Income, High Stability</h4>
          <ul class="space-y-2 text-sm">
            <li class="flex justify-between"><span>Avg Rent/Unit:</span> <strong>$2,200</strong></li>
            <li class="flex justify-between"><span>NOI:</span> <strong>$68,500</strong></li>
            <li class="flex justify-between"><span>Annual Cash Flow:</span> <strong>$15,000</strong></li>
            <li class="flex justify-between text-[#D4AF37] font-bold"><span>DSCR:</span> <span>1.28</span></li>
          </ul>
          <p class="mt-4 text-xs text-neutral-500">Result: A stable, financeable project with strong appreciation potential.</p>
        </div>

        <div class="bg-neutral-50 p-6 rounded border border-neutral-200">
          <h4 class="font-bold text-lg mb-4 text-[#1a1a1a]">Memphis: Low Cost, Thin Margins</h4>
          <ul class="space-y-2 text-sm">
            <li class="flex justify-between"><span>Avg Rent/Unit:</span> <strong>$1,250</strong></li>
            <li class="flex justify-between"><span>NOI:</span> <strong>$39,000</strong></li>
            <li class="flex justify-between"><span>Annual Cash Flow:</span> <strong>$3,000</strong></li>
            <li class="flex justify-between text-red-500 font-bold"><span>DSCR:</span> <span>1.08</span></li>
          </ul>
          <p class="mt-4 text-xs text-neutral-500">Result: Requires incentives or value engineering to meet underwriting standards.</p>
        </div>
      </div>

      <h2>5.0 Memphis Deep Dive: A Pathway to Profitability</h2>
      <p>The expected 1.08 DSCR for the Memphis fourplex presents a significant challenge. To close the viability gap, the project must transition from a premium specification to a <strong>Value-Engineered (VE)</strong> rental model.</p>

      <h3>5.1 Strategic Cost Reduction</h3>
      <p>By prioritizing structural efficiency over expensive finishes, we can align the Total Development Cost with realistic exit values. Key strategies include:</p>
      <ul class="list-disc pl-5 space-y-2 mb-6">
        <li><strong>Shell Optimization:</strong> Using slab-on-grade foundations and simple rectangular geometries to cut framing and concrete costs.</li>
        <li><strong>Exterior:</strong> Using vinyl siding with brick accents rather than full masonry.</li>
        <li><strong>Interiors:</strong> Installing all-electric systems, PEX piping, and durable Luxury Vinyl Plank (LVP) flooring.</li>
      </ul>
      <p class="bg-neutral-100 p-4 border-l-4 border-[#D4AF37] italic text-sm text-neutral-600">
        <strong>Impact:</strong> Swapping expensive finishes for durable alternatives can save <strong>$45,000 to $60,000 per unit</strong>, enabling the development of a profitable financial model.
      </p>

      <h2>6.0 Final Recommendations for GrowShare Capital</h2>
      <ol class="list-decimal pl-5 space-y-4">
        <li>
          <strong>Evaluate Atlanta for a Higher-Capital, Lower-Risk Strategy.</strong><br/>
          Atlanta is a straightforward investment offering a strong initial DSCR of 1.28. It is best suited for investors who prioritize stability and are willing to commit more capital upfront ($925k+ TDC).
        </li>
        <li>
          <strong>Pursue Memphis with a Disciplined, Value-Engineered Approach.</strong><br/>
          Memphis offers a higher yield only if costs are controlled. Target a TDC of <strong>$580,000</strong> to achieve a developer profit of ~$95,000.
        </li>
        <li>
          <strong>Leverage Key Memphis-Specific Optimizations.</strong><br/>
          Verify with the Shelby County Assessor regarding the <strong>25% residential tax rate</strong> vs. the 40% commercial rate. This single action can reduce annual taxes by nearly $2,500 and increase valuation by approximately $35,000.
        </li>
      </ol>

      <div class="not-prose mt-16 pt-10 border-t border-neutral-200">
        <h2 class="text-2xl font-serif font-bold mb-8 text-[#1a1a1a]">About the Author</h2>
        <div class="flex flex-col sm:flex-row items-start gap-8 bg-neutral-50 p-8 rounded-sm">
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/growshare-capital.firebasestorage.app/o/profile%20pictures%2FRyan%20Kelly.png?alt=media&token=ec9d9c01-5329-4942-a5a2-333dcbcce376" 
              alt="Ryan Kelley" 
              class="w-24 h-24 rounded-full object-cover shrink-0 border border-neutral-200 shadow-sm" 
              style="object-position: top;" 
            />
            <div class="flex-1">
                <h3 class="text-xl font-bold text-[#1a1a1a]">Ryan Kelley</h3>
                <p class="text-sm text-[#D4AF37] font-bold uppercase tracking-widest mb-4">Director of Operations & Strategy</p>
                <div class="text-sm text-neutral-600 leading-relaxed space-y-4 font-light">
                    <p>Ryan Kelley is an operations leader and impact strategist combining capital formation with technical execution. As Director of Operations & Development at Dar Un Noor School in Atlanta, GA, he leads revenue strategy and strategic partnerships.</p>
                    <p>Currently an Equity Partner at GrowShare Capital, Ryan leverages the intersection of fundraising, operations, and technology to build resilient infrastructure for high-impact investments.</p>
                </div>
            </div>
        </div>
      </div>
    `
  },
  // STORY 2: The Appointment of Ryan Kelley (Unchanged)
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
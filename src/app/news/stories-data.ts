
// src/data/stories.ts (or wherever you keep this file)

export type Story = {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string; // Storing as YYYY-MM-DD string
  category: string;
  author: string;
  image: string;
  aiHint?: string;       // Optional: for AI image generation prompts
  imagePosition?: string;
  videoUrl?: string;
  pdfUrl?: string;
  summary?: string;
  content?: string;      // The full HTML content of the article
  status?: 'Published' | 'Coming Soon';
  isFeatured?: boolean;
};

// This array is the source of truth for the seeder.
export const storiesData: Omit<Story, 'id' | 'slug'>[] = [
{
  title: 'Capital Allocation Strategy: The Atlanta vs. Memphis Fourplex Arbitrage',
  description: 'A deep-dive comparative analysis evaluating the risk-adjusted returns of workforce housing development in two distinct Southern markets. We explore where the smart capital is moving in 2026.',
  date: '2026-01-22',
  category: 'Market Intelligence',
  author: 'Ryan Kelley',
  image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
  aiHint: 'modern architectural blueprints on a desk',
  imagePosition: 'center',
  isFeatured: true,
  status: 'Published',
  content: `
    <h2>Strategic Overview: The Search for Yield</h2>
    <p>In the current real estate climate, capital efficiency is paramount. This report presents a rigorous, data-driven comparison between <strong>Atlanta, Georgia</strong>, and <strong>Memphis, Tennessee</strong>, evaluating their viability for new fourplex developments. By analyzing 2025 estimates for development costs, rental velocity, and operational cash flow, we determine which market offers the superior balance of entry barriers and profitability.</p>
    
    <p>While Atlanta represents a mature, high-appreciation play, Memphis offers a unique value proposition for the disciplined developer. Our analysis models investment performance using Net Operating Income (NOI) and Debt Service Coverage Ratio (DSCR) to provide a clear framework for informed decision-making.</p>

    <h2>2.0 Market & Lifestyle Profile: Stability vs. Affordability</h2>
    <p>Financial metrics do not exist in a vacuum; they are downstream of economic drivers. Atlanta is defined by a thriving job market in tech, finance, and entertainment. Conversely, Memphis emphasizes lifestyle and extreme affordability, backed by a rich cultural heritage and landmarks like Beale Street.</p>
    
    <p>The disparity in entry costs is stark. The median existing fourplex in Atlanta trades at <strong>$530,000</strong>, whereas a comparable asset in Memphis trades at just <strong>$222,500</strong>. This gap highlights the fundamental difference: Atlanta is a capital-intensive appreciation market, while Memphis is a cash-flow-centric volume market.</p>

    <h2>3.0 The Cost of Entry: Development Analysis</h2>
    <p>Total Development Cost (TDC) sets the floor for profitability. Our analysis reveals a massive capital efficiency advantage in Memphis. The projected TDC for a Memphis project is approximately <strong>$255,000 lower</strong> than in Atlanta.</p>
    
    <p>This differential is so significant that an investor can develop nearly <strong>three projects in Memphis for the capital required to build two in Atlanta</strong>. This is driven by lower labor indices, stronger trade availability, and the absence of impact fees in the Memphis market.</p>

    <h3>Projected Development Budget Comparison</h3>
    <table>
      <thead>
        <tr>
          <th>Cost Category</th>
          <th>Atlanta Metro</th>
          <th>Memphis Metro</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Hard Costs</strong> (Labor & Materials)</td>
          <td>$740,000</td>
          <td>$545,000</td>
        </tr>
        <tr>
          <td><strong>Soft Costs</strong> (Arch, Eng, Permits)</td>
          <td>$90,000 - $110,000</td>
          <td>$50,000 - $60,000</td>
        </tr>
        <tr>
          <td><strong>Total Development Cost</strong></td>
          <td><strong>$925,000 – $975,000</strong></td>
          <td><strong>$670,000 – $720,000</strong></td>
        </tr>
      </tbody>
    </table>
    <p><em>Source: Section 3.2 Total Development Cost Analysis.</em></p>

    <h2>4.0 Financial Performance: The DSCR Dilemma</h2>
    <p>While Memphis is cheaper to build, Atlanta commands significantly higher rents ($2,200/unit vs. $1,250/unit). This revenue disparity creates a divergence in financeability:</p>
    <ul>
      <li><strong>Atlanta:</strong> Generates a healthy <strong>1.28 DSCR</strong> and $15,000 in annual cash flow, making it a stable, easily bankable asset.</li>
      <li><strong>Memphis:</strong> Yields a risky <strong>1.08 DSCR</strong> with thin margins ($3,000 annual cash flow).</li>
    </ul>
    <p>A DSCR near 1.0 generally fails conventional underwriting standards. This forces a critical pivot: Memphis cannot be approached with a "standard" build strategy. It requires engineering.</p>

    <h2>5.0 The "Memphis Alpha": Value Engineering Strategy</h2>
    <p>To unlock the yield in Memphis, we must close the viability gap. At a standard build cost, the project is underwater relative to supportable debt. The solution is a transition to a <strong>Value-Engineered (VE) rental model</strong>.</p>

    <h3>Strategic Cost Reductions</h3>
    <p>By prioritizing structural efficiency over premium finishes, we can realign the cost basis with the exit value:</p>
    <ul>
      <li><strong>Structural Optimization:</strong> Utilizing slab-on-grade foundations and simple rectangular framing geometry to minimize concrete and lumber waste.</li>
      <li><strong>Exterior Efficiency:</strong> Moving from full masonry to vinyl siding with strategic brick accents.</li>
      <li><strong>Systems & Finishes:</strong> Implementing all-electric systems, PEX piping, and durability-focused Luxury Vinyl Plank (LVP) flooring rather than tile or quartz.</li>
    </ul>
    <p><strong>Impact:</strong> This strategy can reduce costs by <strong>$45,000 to $60,000 per unit</strong>, transforming the Memphis asset from a borderline risk to a profitable hold.</p>

    <h2>6.0 Investment Verdict</h2>
    <p>The choice between these markets is not about "better or worse," but about strategic alignment:</p>
    <ol>
      <li><strong>For Stability (The Atlanta Play):</strong> Investors seeking low-risk, long-term appreciation should deploy capital in Atlanta. The strong DSCR (1.28) and mature market demand justify the higher entry price.</li>
      <li><strong>For Yield (The Memphis Play):</strong> Investors seeking higher returns must execute a disciplined, value-engineered strategy. By targeting a TDC of $580,000 ($125/sq ft), developers can capture a projected profit of $95,000 per asset.</li>
    </ol>
    <p><em>Pro Tip for Memphis:</em> Verify tax classifications with the Shelby County Assessor. Structuring the property to achieve the 25% residential rate (vs. 40% commercial) can save $2,500 annually and boost valuation by ~ $35,000.</p>
    <div class="not-prose">
      <hr class="!my-16" />
      <h2 class="text-2xl font-bold mb-6">About the Author</h2>
      <div class="flex flex-col sm:flex-row items-start gap-6">
          <img src="https://firebasestorage.googleapis.com/v0/b/growshare-capital.firebasestorage.app/o/profile%20pictures%2FRyan%20Kelly.png?alt=media&token=ec9d9c01-5329-4942-a5a2-333dcbcce376" alt="Ryan Kelley" class="w-24 h-24 rounded-full object-cover shrink-0" style="object-position: top;" />
          <div class="flex-1">
              <h3 class="text-xl font-semibold">Ryan Kelley</h3>
              <p class="text-sm text-neutral-500 italic mb-4">Director & Operations & Development</p>
              <div class="text-sm text-neutral-600 leading-relaxed space-y-4">
                  <p>Ryan Kelley is an operations leader and impact strategist combining capital formation with technical execution. As Director of Operations & Development at Dar Un Noor School in Atlanta, GA, he leads revenue strategy and strategic partnerships, securing ~$500K in restricted funding and driving a 25% increase in revenue reliability. His expertise extends to board-level governance, where he supports multimillion-dollar capital initiatives, including a $5M New Markets Tax Credit acquisition with Global Village Project and a $1M fundraising campaign with CAIR Georgia.</p>
                  <p>Ryan’s background in project and asset management includes overseeing critical readiness workflows for a $250M residential real estate portfolio with RESICAP. He pairs this with deep technical fluency, having led enterprise system integrations and data governance strategies for FinTech and MedTech firms.</p>
                  <p>Currently an Equity Partner at GrowShare Capital, Ryan leverages this intersection of fundraising, operations, and technology to build resilient infrastructure for high-impact investments.</p>
              </div>
          </div>
      </div>
    </div>
  `
},
{
  title: 'GrowShare Capital Appoints Ryan Kelley to Lead Operations & Strategy',
  description: 'This strategic move reinforces the operational backbone supporting the firm’s growing investment portfolio. Kelley enters the role with a resume that merges technical execution with the capital formation skills needed for impact-driven development.',
  date: '2026-01-16',
  category: 'Company News',
  author: 'GrowShare Capital',
  image: 'https://firebasestorage.googleapis.com/v0/b/growshare-capital.firebasestorage.app/o/profile%20pictures%2FRyan%20Kelly.png?alt=media&token=ec9d9c01-5329-4942-a5a2-333dcbcce376',
  aiHint: 'man portrait professional',
  imagePosition: 'top',
  isFeatured: true,
  status: 'Published',
  content: ''
}
];

    
// src/data/stories.ts

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
// STORY 1: The Market Analysis (Memphis vs Atlanta)
{
  title: 'A Tale of Two Cities: The Atlanta vs. Memphis Arbitrage',
  description: 'Where should smart capital flow in 2026? We pit the high-flying stability of Atlanta against the gritty, high-yield potential of Memphis in a battle for workforce housing dominance.',
  date: '2026-01-27',
  category: 'Investment Strategy',
  author: 'Ryan Kelley',
  image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
  aiHint: 'modern architectural blueprints on a desk',
  imagePosition: 'center',
  isFeatured: true,
  status: 'Published',
  content: `
    <h2>The Search for "Alpha" in the South</h2>
    <p>In real estate, there is often a tension between the asset you <em>want</em> to own and the asset that actually makes money. This report breaks down that tension by comparing two Southern titans: <strong>Atlanta, Georgia</strong>, and <strong>Memphis, Tennessee</strong>.</p>
    
    <p>We analyzed 2025 data for new fourplex developments in both markets. The question wasn't just "which city is cooler?" (though we have opinions on BBQ vs. Lemon Pepper Wings). The question was: <strong>Where is the risk-adjusted return hiding?</strong></p>

    <h2>The Vibe Check: Stability vs. Affordability</h2>
    <p><strong>Atlanta</strong> is the Hollywood of the South. It’s driven by tech, finance, and a massive film industry. It feels expensive because it is. The median existing fourplex here trades at <strong>$530,000</strong>. It’s a mature market for investors who sleep better knowing their asset is appreciating while they nap.</p>
    
    <p><strong>Memphis</strong>, on the other hand, is the soul of the Delta. It’s defined by logistics, music history (Beale Street), and extreme affordability. A comparable fourplex here? Just <strong>$222,500</strong>. That is a massive gap that screams "opportunity" for the cash-flow investor.</p>

    <h2>The Cost of Entry: A Massive Discount</h2>
    <p>Here is where the math gets fun. Our analysis shows that building a new fourplex in Memphis costs roughly <strong>$255,000 less</strong> than building the exact same structure in Atlanta.</p>
    
    <p>Why? Cheaper labor, better trade availability, and—crucially—<strong>zero impact fees</strong> in Memphis. This capital efficiency creates a "3-for-2" special: For the capital required to build two projects in Atlanta, you could nearly build three in Memphis.</p>

    <h3>The Tale of the Tape (Projected Costs)</h3>
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
          <td><strong>Hard Costs</strong> (Brick & Mortar)</td>
          <td>$740,000</td>
          <td>$545,000</td>
        </tr>
        <tr>
          <td><strong>Soft Costs</strong> (Paperwork & Permits)</td>
          <td>~$100,000</td>
          <td>~$55,000</td>
        </tr>
        <tr>
          <td><strong>Total Entry Price</strong></td>
          <td><strong>~$950,000</strong></td>
          <td><strong>~$695,000</strong></td>
        </tr>
      </tbody>
    </table>
    <p><em>Data Source: Comparative Development Cost Analysis.</em></p>

    <h2>The Elephant in the Room: The DSCR Trap</h2>
    <p>If Memphis is so cheap, why isn't everyone doing it? <strong>The rent check.</strong></p>
    <p>Atlanta commands rents of roughly <strong>$2,200/unit</strong>, generating a healthy <strong>1.28 Debt Service Coverage Ratio (DSCR)</strong>. Banks love this. It flows cash immediately ($15k/year).</p>
    <p>Memphis rents average <strong>$1,250/unit</strong>. Even with the cheaper build cost, the "standard" Memphis project only hits a <strong>1.08 DSCR</strong>. That is razor-thin. Most lenders will laugh you out of the room at 1.08.</p>
    
    <p>So, is Memphis a trap? Not if you know how to engineer it.</p>

    <h2>The Secret Sauce: "Value Engineering"</h2>
    <p>To make Memphis work, you can't build a Buckhead palace in a blues neighborhood. You have to get strategic. By transitioning to a <strong>Value-Engineered (VE)</strong> model, we can slash costs without sacrificing durability.</p>

    <ul>
      <li><strong>Structural Hygiene:</strong> Swap complex foundations for efficient slab-on-grade. Keep the geometry simple (rectangles are cheaper than zig-zags).</li>
      <li><strong>Material Smarts:</strong> Ditch the full masonry for vinyl siding with strategic brick accents. Swap quartz countertops for high-end laminate. Use PEX piping and all-electric systems.</li>
    </ul>
    <p><strong>The Payoff:</strong> These tweaks can shave <strong>$45,000 to $60,000 per unit</strong> off the cost. Suddenly, that 1.08 DSCR jumps up to an investable level, and you are capturing a projected developer profit of <strong>$95,000</strong> per asset.</p>

    <h2>The Verdict</h2>
    <ol>
      <li><strong>Choose Atlanta</strong> if you want a "Blue Chip" stock. It’s stable, financeable immediately (1.28 DSCR), and offers long-term appreciation. It's the safe bet.</li>
      <li><strong>Choose Memphis</strong> if you are an "Alpha Hunter." It requires discipline and value engineering, but the lower entry point allows you to scale volume faster and capture higher yields on cost.</li>
    </ol>
    <p class="bg-neutral-100 p-4 border-l-4 border-[#D4AF37] italic text-sm text-neutral-600">
      <strong>Pro Tip for Memphis:</strong> Call the Shelby County Assessor. If you structure the property correctly, you can get taxed at the <strong>25% residential rate</strong> instead of the 40% commercial rate. That one phone call saves you <strong>$2,500/year</strong> and boosts your asset value by <strong>$35,000</strong> overnight.
    </p>

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
                  <p>Ryan Kelley is an operations leader and impact strategist combining capital formation with technical execution. As Director of Operations & Development at Dar Un Noor School in Atlanta, GA, he leads revenue strategy and strategic partnerships, securing ~$500K in restricted funding and driving a 25% increase in revenue reliability. His expertise extends to board-level governance, where he supports multimillion-dollar capital initiatives, including a $5M New Markets Tax Credit acquisition with Global Village Project and a $1M fundraising campaign with CAIR Georgia.</p>
                  <p>Ryan’s background in project and asset management includes overseeing critical readiness workflows for a $250M residential real estate portfolio with RESICAP. He pairs this with deep technical fluency, having led enterprise system integrations and data governance strategies for FinTech and MedTech firms.</p>
                  <p>Currently an Equity Partner at GrowShare Capital, Ryan leverages this intersection of fundraising, operations, and technology to build resilient infrastructure for high-impact investments.</p>
              </div>
          </div>
      </div>
    </div>
    `
},
// STORY 2: The Appointment of Ryan Kelley
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
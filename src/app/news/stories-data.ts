
import type { Timestamp } from "firebase/firestore";

export type Story = {
    id: string;
    slug: string;
    title: string;
    description: string;
    date: string; // Storing as YYYY-MM-DD string
    category: string;
    author: string;
    image: string;
    aiHint?: string;       // <--- Made Optional (Safe)
    imagePosition?: string;
    videoUrl?: string;
    pdfUrl?: string;
    summary?: string;
    content?: string;
    status?: 'Published' | 'Coming Soon';
    isFeatured?: boolean;
};

// This array is the source of truth for the seeder.
export const storiesData: Omit<Story, 'id' | 'slug'>[] = [
  {
    title: 'Comparative Market Analysis: Fourplex Development in Atlanta vs. Memphis',
    description: 'This report presents a data-driven comparison of Atlanta, Georgia, and Memphis, Tennessee, as potential markets for new fourplex developments, evaluating costs, rental income, and overall financial viability.',
    date: '2026-01-22',
    category: 'Reports',
    author: 'Ryan Kelley',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
    aiHint: 'modern apartment interior',
    imagePosition: 'center',
    isFeatured: false,
    status: 'Published',
    content: `
      <h2>1.0 Introduction and Strategic Overview</h2>
      <p>This report presents a data-driven comparison of Atlanta, Georgia, and Memphis, Tennessee, as potential markets for new fourplex developments. Each market is evaluated using key investment criteria: development costs, rental income potential, and overall financial viability. The analysis uses 2025 estimates to identify which market offers the best balance of entry cost, operational cash flow, and potential profitability.</p>
      <p>The analysis starts with an overview of each city's economic and cultural landscape, followed by projected construction and development costs. Investment performance for a standard fourplex is modeled using Net Operating Income (NOI) and Debt Service Coverage Ratio (DSCR). The report concludes with a detailed analysis of Memphis and a targeted profitability strategy. This structure provides GrowShare Capital with a clear framework for informed decision-making, consistently referencing the core decision metric.</p>
      
      <h2>2.0 High-Level Market Profile Comparison</h2>
      <p>Before looking at the financial data, it is important to consider how economic and lifestyle factors in Atlanta and Memphis affect long-term tenant demand, rental growth, and property values. The tables below highlight each city's main features and fourplex market conditions.</p>
      
      <h3>Market Snapshot:</h3>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Atlanta, GA</th>
            <th>Memphis, TN</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Key Economic Drivers</strong></td>
            <td>• Thriving job market in tech, finance, and entertainment<br/>• Market profile emphasizes lifestyle and affordability over specific industry drivers</td>
            <td>• Rich musical heritage with landmarks like Beale Street<br/>• Diverse and famous cuisine, including barbecue and soul food<br/>• Access to the Mississippi River for outdoor enthusiasts</td>
          </tr>
          <tr>
            <td><strong>Cultural & Lifestyle Appeal</strong></td>
            <td>• Rich history and vibrant cultural scene<br/>• Numerous museums, festivals, and a dynamic food scene<br/>• Extensive park system and year-round outdoor activities</td>
            <td>• Welcoming atmosphere and mild climate</td>
          </tr>
           <tr>
            <td><strong>Cost of Living</strong></td>
            <td>• Relatively low cost of living compared to other major cities<br/>• Provides affordable housing and a high quality of life</td>
            <td>• Low cost of living and affordable housing provide great value</td>
          </tr>
        </tbody>
      </table>

      <h3>Median Existing Fourplex Data</h3>
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Atlanta, GA</th>
            <th>Memphis, TN</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Median Fourplex Cost</td>
            <td>$530,000</td>
            <td>$222,500</td>
          </tr>
          <tr>
            <td>Median Fourplex Area (sq ft)</td>
            <td>2,836 sq ft</td>
            <td>3,881 sq ft</td>
          </tr>
        </tbody>
      </table>
      <p>This overview highlights the main differences between the two markets. The following section examines the specific financial inputs required for new development in each city.</p>

      <h2>3.0 Comparative Development Cost Analysis</h2>
      <p>Understanding Total Development Cost (TDC) is essential, as it determines the initial capital required and sets the cost basis for future profitability. The following analysis uses a standardized fourplex project to compare the Atlanta and Memphis metropolitan areas directly.</p>
      <p><strong>Baseline Project Assumptions:</strong></p>
      <ul>
        <li>Building Type: 4-Plex (Townhome or Garden-style)</li>
        <li>Unit Mix: Four (4) x 2BR / 2BA units</li>
        <li>Average Unit Size: 950–1,050 SF</li>
        <li>Total Gross Area: 4,000–4,200 SF</li>
        <li>Finish Level: Workforce / Market-Rate</li>
      </ul>

      <h3>3.1 Hard Construction Costs</h3>
      <p>Hard costs include the tangible aspects of construction, such as labor and materials. These costs account for the largest share of the development budget and are heavily influenced by local market conditions.</p>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Atlanta Metro</th>
            <th>Memphis Metro</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cost per SF (Hard)</td>
            <td>$165 – $195</td>
            <td>$120 – $145</td>
          </tr>
          <tr>
            <td>Total Hard Cost</td>
            <td>$660k – $820k</td>
            <td>$480k – $610k</td>
          </tr>
          <tr>
            <td>Labor Cost Index</td>
            <td>High</td>
            <td>Moderate</td>
          </tr>
          <tr>
            <td>Material Cost</td>
            <td>Higher</td>
            <td>Lower</td>
          </tr>
          <tr>
            <td>Trade Availability</td>
            <td>Tight</td>
            <td>Strong</td>
          </tr>
        </tbody>
      </table>
      
      <h3>3.2 Total Development Cost (TDC)</h3>
      <p>Total Development Cost includes all project expenses, from hard construction costs to soft costs like design fees, permits, financing, and contingency funds.</p>
        <table>
          <thead>
            <tr>
              <th>Cost Item</th>
              <th>Atlanta Metro</th>
              <th>Memphis Metro</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Hard Costs</td>
              <td>$740,000</td>
              <td>$545,000</td>
            </tr>
            <tr>
              <td>Architecture & Engineering</td>
              <td>$55,000</td>
              <td>$35,000</td>
            </tr>
            <tr>
              <td>Permits, Impact & Utilities</td>
              <td>$35,000 – $55,000</td>
              <td>$15,000 – $25,000</td>
            </tr>
            <tr>
              <td>Financing, Insurance, Legal</td>
              <td>$45,000</td>
              <td>$35,000</td>
            </tr>
            <tr>
              <td>Contingency (7%)</td>
              <td>$50,000</td>
              <td>$38,000</td>
            </tr>
            <tr>
              <td><strong>Total Development Cost</strong></td>
              <td><strong>$925,000 – $975,000</strong></td>
              <td><strong>$670,000 – $720,000</strong></td>
            </tr>
          </tbody>
        </table>
      <p>The analysis reveals a significant cost difference between the two markets, with Memphis’s projected TDC approximately $255,000 lower than Atlanta’s. This capital efficiency provides a strategic advantage by lowering the entry barrier and enabling the development of nearly three projects in Memphis for every two in Atlanta. The absence of impact fees in Memphis further reduces soft costs compared to more developed markets such as Atlanta.</p>
      <p>The following section examines how this initial investment affects operational performance and potential returns.</p>

      <h2>4.0 Investment Performance and Financial Viability</h2>
      <p>While development cost determines the initial investment, long-term financial viability depends on the project's ability to generate sufficient income to cover operating expenses and debt service. This is best evaluated using two key metrics: Net Operating Income (NOI), which measures profitability before debt, and Debt Service Coverage Ratio (DSCR), which lenders use to assess a property's ability to cover loan payments. Examining potential changes in capitalization rates or exit multiples can further clarify the impact on these metrics. A sensitivity analysis of these variables will help stress-test the model and show that the forecasts remain robust under varying market conditions.</p>
      <p><strong>Key Financial Assumptions:</strong></p>
      <ul>
          <li>Loan Terms: 75% Loan-to-Value (LTV), 6.75% interest, 30-year amortization</li>
          <li>Vacancy Rate: 7%</li>
          <li>Operating Expenses: 35% of Gross Rent</li>
      </ul>
      <h3>Comparative Cash-Flow & DSCR Analysis (Hold Strategy)</h3>
       <table>
          <thead>
            <tr>
              <th>Metric</th>
              <th>Atlanta Metro</th>
              <th>Memphis Metro</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Avg Rent / Unit / Month</td>
              <td>$2,200</td>
              <td>$1,250</td>
            </tr>
            <tr>
              <td>Gross Annual Rent</td>
              <td>$105,600</td>
              <td>$60,000</td>
            </tr>
            <tr>
              <td>Net Operating Income (NOI)</td>
              <td>$68,500</td>
              <td>$39,000</td>
            </tr>
            <tr>
              <td>Annual Debt Service</td>
              <td>$53,500</td>
              <td>$36,000</td>
            </tr>
            <tr>
              <td>Cash Flow (Annual)</td>
              <td>$15,000</td>
              <td>$3,000</td>
            </tr>
             <tr>
              <td><strong>DSCR</strong></td>
              <td><strong>1.28</strong></td>
              <td><strong>1.08</strong></td>
            </tr>
          </tbody>
        </table>
      <p>The analysis demonstrates a clear trade-off. The Atlanta project, despite higher development costs, generates significantly higher rental income, resulting in a 1.28 DSCR and an annual pre-tax cash flow of $15,000. This outcome reflects a stable, financeable project with strong potential for asset appreciation.</p>
      <p>In contrast, the Memphis project yields much thinner margins. Its lower entry cost results in a 1.08 DSCR and only $3,000 in annual cash flow. A DSCR near 1.0 does not meet conventional underwriting standards and requires additional incentives, such as tax abatements or subordinate debt, to achieve financeability.</p>
      <p>This situation raises a critical question: given the challenging initial financial metrics, can a new-construction fourplex in Memphis be a viable investment, and what specific actions are needed to ensure its success?</p>

      <h2>5.0 Memphis Deep Dive: A Pathway to Profitability</h2>
      <p>The expected 1.08 DSCR for the Memphis fourplex presents a significant challenge for investors seeking standard financing. This section examines the Memphis market in detail, quantifies the gap, and provides a clear plan to reduce risk and achieve a lender-acceptable DSCR.</p>
      
      <h3>5.1 The Viability Gap Analysis</h3>
      <p>A typical valuation approach starts with the lender’s required DSCR to determine the maximum loan amount and purchase price. This analysis shows that to achieve a 1.28 DSCR with market rents of $1,250 per unit, the maximum supportable property price is about $465,000, which is well below the projected development cost of $670,000 to $720,000.</p>
      <p>In summary, at the current TDC, the project does not match Memphis’s supportable debt and income levels, so it cannot be financed as is.</p>

      <h3>5.2 Strategic Cost Reduction via Value Engineering (VE)</h3>
      <p>To close the current viability gap, the project will transition from a premium specification to a Value-Engineered (VE) rental model. This approach aligns the Total Development Cost (TDC) with realistic exit values by prioritizing structural efficiency and durability over expensive finishes.</p>
      <p>The plan starts by optimizing the building shell, using a slab-on-grade foundation and a simple rectangular shape to cut framing and concrete costs. Exterior costs are reduced by choosing standard window sizes and a mix of vinyl siding with a brick accent rather than full masonry.</p>
      <p>Inside, the design focuses on lowering utility and turnover costs. The plan uses all-electric systems instead of natural gas, PEX piping with stacked wet walls, and durable Luxury Vinyl Plank (LVP) flooring. By swapping expensive finishes like quartz and tile for laminate countertops and fiberglass tubs, the project can save $45,000 to $60,000 per unit, improving the financial outlook and helping to ensure profitability.</p>
      <p>Rigorous implementation of this Value Engineering strategy enables the development of a revised, profitable financial model for the Memphis project.</p>

      <h2>6.0 Final Recommendations for GrowShare Capital</h2>
      <p>This analysis highlights the fundamental trade-off between the Atlanta and Memphis markets. Atlanta offers a higher-cost, higher-return profile with immediate financial stability, while Memphis provides a lower-cost entry point with higher initial risk but the potential for engineered profitability. Based on these findings, the following recommendations are provided.</p>
      
      <ol>
        <li><strong>Evaluate Atlanta for a Higher-Capital, Lower-Risk Strategy.</strong><br/>Atlanta is a straightforward investment, offering a strong initial DSCR of 1.28 and significant long-term appreciation potential. It is best suited for investors who prioritize stability and are willing to commit more capital upfront. The Total Development Cost of $925,000 to $975,000 reflects a mature market with strong rental demand.</li>
        <li><strong>Pursue Memphis with a disciplined, value-engineered approach.</strong><br/>Memphis offers a higher yield only if development costs are tightly controlled. The project should target a Total Development Cost of $580,000, reducing hard costs to about $450,000 ($125 per square foot). Staying within this budget allows for a quality asset that can be sold for $675,000, supported by the rental market, and generating a projected developer profit of $95,000.</li>
        <li><strong>Leverage Key Memphis-Specific Optimizations.</strong><br/>Beyond construction cost control, success in Memphis requires leveraging local market nuances. It is important to verify with the Shelby County Assessor whether the property can be structured to achieve the residential (25%) rather than the commercial (40%) tax assessment rate. This single action can reduce annual property taxes by nearly $2,500 and increase the property's valuation by approximately $35,000. Additionally, actively pursuing local tax abatements or PILOT (Payment in Lieu of Taxes) programs can further enhance the project's financial returns.</li>
      </ol>
      <p>The final decision depends on GrowShare Capital's strategic priorities: allocating higher capital for stable, long-term appreciation in Atlanta or implementing a disciplined, cost-controlled development strategy to achieve superior yield in Memphis.</p>
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

    
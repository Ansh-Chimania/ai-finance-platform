import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

// Dummy data for preview
const PREVIEW_DATA = {
  monthlyReport: {
    userName: "John Doe",
    type: "monthly-report",
    data: {
      month: "December",
      stats: {
        totalIncome: 5000,
        totalExpenses: 3500,
        byCategory: {
          housing: 1500,
          groceries: 600,
          transportation: 400,
          entertainment: 300,
          utilities: 700,
        },
      },
      insights: [
        "Your housing expenses are 43% of your total spending.",
        "Great job keeping entertainment expenses under control!",
      ],
    },
  },
  budgetAlert: {
    userName: "John Doe",
    type: "budget-alert",
    data: {
      percentageUsed: 85,
      budgetAmount: 4000,
      totalExpenses: 3400,
    },
  },
};

export default function EmailTemplate({
  userName = "User",
  type = "monthly-report",
  data = {},
}) {
  // ✅ SAFE FALLBACKS (IMPORTANT FIX)
  const stats = data?.stats || {};
  const totalIncome = stats?.totalIncome || 0;
  const totalExpenses = stats?.totalExpenses || 0;
  const byCategory = stats?.byCategory || {};
  const insights = data?.insights || [];

  const percentageUsed = data?.percentageUsed || 0;
  const budgetAmount = data?.budgetAmount || 0;
  const spent = data?.totalExpenses || 0;

  if (type === "monthly-report") {
    return (
      <Html>
        <Head />
        <Preview>Your Monthly Financial Report</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>Monthly Financial Report</Heading>

            <Text style={styles.text}>Hello {userName},</Text>
            <Text style={styles.text}>
              Here’s your financial summary for {data?.month || "this month"}:
            </Text>

            <Section style={styles.statsContainer}>
              <div style={styles.stat}>
                <Text style={styles.text}>Total Income</Text>
                <Text style={styles.heading}>${totalIncome}</Text>
              </div>

              <div style={styles.stat}>
                <Text style={styles.text}>Total Expenses</Text>
                <Text style={styles.heading}>${totalExpenses}</Text>
              </div>

              <div style={styles.stat}>
                <Text style={styles.text}>Net</Text>
                <Text style={styles.heading}>
                  ${totalIncome - totalExpenses}
                </Text>
              </div>
            </Section>

            {Object.keys(byCategory).length > 0 && (
              <Section style={styles.section}>
                <Heading style={styles.heading}>Expenses by Category</Heading>
                {Object.entries(byCategory).map(([category, amount]) => (
                  <div key={category} style={styles.row}>
                    <Text style={styles.text}>{category}</Text>
                    <Text style={styles.text}>${amount}</Text>
                  </div>
                ))}
              </Section>
            )}

            {insights.length > 0 && (
              <Section style={styles.section}>
                <Heading style={styles.heading}>Welth Insights</Heading>
                {insights.map((insight, index) => (
                  <Text key={index} style={styles.text}>
                    • {insight}
                  </Text>
                ))}
              </Section>
            )}

            <Text style={styles.footer}>
              Thank you for using Welth.
            </Text>
          </Container>
        </Body>
      </Html>
    );
  }

  if (type === "budget-alert") {
    return (
      <Html>
        <Head />
        <Preview>Budget Alert</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>Budget Alert</Heading>

            <Text style={styles.text}>Hello {userName},</Text>

            <Text style={styles.text}>
              You’ve used {percentageUsed.toFixed(1)}% of your budget.
            </Text>

            <Section style={styles.statsContainer}>
              <div style={styles.stat}>
                <Text style={styles.text}>Budget</Text>
                <Text style={styles.heading}>${budgetAmount}</Text>
              </div>

              <div style={styles.stat}>
                <Text style={styles.text}>Spent</Text>
                <Text style={styles.heading}>${spent}</Text>
              </div>

              <div style={styles.stat}>
                <Text style={styles.text}>Remaining</Text>
                <Text style={styles.heading}>
                  ${budgetAmount - spent}
                </Text>
              </div>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  }
}

const styles = {
  body: {
    backgroundColor: "#f6f9fc",
    fontFamily: "-apple-system, sans-serif",
  },
  container: {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "5px",
  },
  title: {
    fontSize: "28px",
    textAlign: "center",
    marginBottom: "20px",
  },
  heading: {
    fontSize: "18px",
    fontWeight: "600",
  },
  text: {
    fontSize: "14px",
  },
  section: {
    marginTop: "20px",
  },
  statsContainer: {
    marginTop: "20px",
  },
  stat: {
    marginBottom: "10px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
  },
  footer: {
    marginTop: "20px",
    textAlign: "center",
  },
};
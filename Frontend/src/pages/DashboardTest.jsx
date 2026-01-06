import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const DashboardTest = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  const handleSignOut = () => {
    localStorage.removeItem("userInfo");
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8">
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <div className="space-y-4">
            <p className="text-lg">
              <strong>Welcome,</strong> {userInfo.name || "User"}!
            </p>
            <p className="text-muted-foreground">
              Email: {userInfo.email}
            </p>
            <p className="text-muted-foreground">
              Role: {userInfo.role}
            </p>
            <p className="text-muted-foreground">
              User Type: {userInfo.userType}
            </p>
          </div>
          <div className="mt-8">
            <Button onClick={handleSignOut} variant="outline">
              Sign Out
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardTest;

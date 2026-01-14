import { useState } from 'react';
import { AlertTriangle, Trash2, Download, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

export const DangerZone = ({ onDeleteAccount, onExportData, onSignOut }) => {
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Your data export has been initiated. You will receive an email shortly.');
    } catch (error) {
      toast.error('Failed to export data');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== 'DELETE') {
      toast.error('Please type DELETE to confirm');
      return;
    }

    setIsDeleting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      if (onDeleteAccount) {
        onDeleteAccount();
      }
      toast.success('Account deleted successfully');
    } catch (error) {
      toast.error('Failed to delete account');
    } finally {
      setIsDeleting(false);
      setDeleteConfirm('');
    }
  };

  return (
    <Card className="border-destructive/50">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-destructive/10">
            <AlertTriangle className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>
              Irreversible and destructive actions
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Export Data */}
        <div className="p-4 rounded-lg border">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Export Your Data</h3>
              <p className="text-sm text-muted-foreground">
                Download a copy of all your data including projects, messages, and transactions
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleExportData}
              disabled={isExporting}
              className="ml-4"
            >
              <Download className="w-4 h-4 mr-2" />
              {isExporting ? 'Exporting...' : 'Export Data'}
            </Button>
          </div>
        </div>

        {/* Sign Out All Sessions */}
        <div className="p-4 rounded-lg border">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Sign Out All Sessions</h3>
              <p className="text-sm text-muted-foreground">
                Sign out from all devices and browsers
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="ml-4">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Sign Out All Sessions?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will sign you out from all devices and browsers. You will need to sign in again.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onSignOut}>
                    Sign Out All
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Delete Account */}
        <div className="p-4 rounded-lg border border-destructive/50 bg-destructive/5">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-destructive mb-1">Delete Account</h3>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription className="space-y-3">
                    <p>
                      This action cannot be undone. This will permanently delete your account
                      and remove all your data from our servers.
                    </p>
                    <div className="space-y-2 pt-2">
                      <Label htmlFor="deleteConfirm">
                        Type <span className="font-mono font-bold">DELETE</span> to confirm:
                      </Label>
                      <Input
                        id="deleteConfirm"
                        value={deleteConfirm}
                        onChange={(e) => setDeleteConfirm(e.target.value)}
                        placeholder="DELETE"
                        className="font-mono"
                      />
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setDeleteConfirm('')}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    disabled={deleteConfirm !== 'DELETE' || isDeleting}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {isDeleting ? 'Deleting...' : 'Delete Account'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};











import { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const ChatPopup = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [showInitialPopup, setShowInitialPopup] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    // Show the popup after 5 seconds on the site
    const timer = setTimeout(() => {
      setShowInitialPopup(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleCloseInitialPopup = () => {
    setShowInitialPopup(false);
  };

  const handleOpenChat = () => {
    setShowInitialPopup(false);
    setIsPopupOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // In a real app, you would send this message to your backend
      console.log("Message sent:", message);
      setMessage('');
      // Simulate response
      alert("Thanks for your message! We'll get back to you soon.");
    }
  };

  if (isDesktop) {
    return (
      <>
        {/* Initial popup that appears after a few seconds */}
        {showInitialPopup && (
          <div className="fixed bottom-24 right-6 z-50 max-w-[300px] shadow-lg animate-fade-in">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                <div className="flex items-center gap-2">
                  <img 
                    src="/lovable-uploads/5de360aa-8105-490e-bf75-94ff7ac0832d.png" 
                    alt="SportBnk Logo" 
                    className="h-6 w-auto" 
                  />
                  <span className="font-semibold text-base">Jared from SportBnk</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCloseInitialPopup}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-2 pb-3">
                <p className="text-sm">
                  Hi there! I'm Jared from SportBnk. We help sports organizations discover, boost, and recruit talent. 
                  Would love to chat about how we can help your organization!
                </p>
              </CardContent>
              <CardFooter className="p-3 pt-0 flex gap-2">
                <Button size="sm" className="flex-1 bg-sportbnk-green hover:bg-sportbnk-green/90" onClick={handleOpenChat}>
                  Get in touch
                </Button>
                <Button size="sm" className="flex-1 bg-sportbnk-navy hover:bg-sportbnk-navy/90" asChild>
                  <Link to="/book-demo" className="flex items-center justify-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Book a meeting</span>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {/* Chat dialog that opens when button is clicked */}
        <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
          <DialogTrigger asChild>
            <Button 
              className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-sportbnk-green hover:bg-sportbnk-green/90 shadow-lg flex items-center justify-center"
              size="icon"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[400px] p-0 gap-0">
            <div className="bg-sportbnk-navy text-white p-4">
              <div className="flex items-center gap-2 mb-2">
                <img 
                  src="/lovable-uploads/5de360aa-8105-490e-bf75-94ff7ac0832d.png" 
                  alt="SportBnk Logo" 
                  className="h-8 w-auto" 
                />
                <h3 className="font-semibold">Chat with SportBnk</h3>
              </div>
              <p className="text-sm opacity-90">
                Hi there! I'm Jared. How can I help you today?
              </p>
            </div>
            <div className="p-4 h-[300px] overflow-y-auto">
              <div className="bg-gray-100 p-3 rounded-lg inline-block max-w-[80%]">
                <p className="text-sm">
                  We provide an intelligence platform for sports organizations to discover, boost, and recruit talent.
                  Would love to hear more about your needs!
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon" className="bg-sportbnk-green hover:bg-sportbnk-green/90">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Mobile version using Drawer instead of Dialog
  return (
    <>
      {/* Initial popup for mobile */}
      {showInitialPopup && (
        <div className="fixed bottom-20 left-4 right-4 z-50 shadow-lg animate-fade-in">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
              <div className="flex items-center gap-2">
                <img 
                  src="/lovable-uploads/5de360aa-8105-490e-bf75-94ff7ac0832d.png" 
                  alt="SportBnk Logo" 
                  className="h-6 w-auto" 
                />
                <span className="font-semibold text-base">Jared from SportBnk</span>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCloseInitialPopup}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-4 pt-2 pb-3">
              <p className="text-sm">
                Hi there! I'm Jared from SportBnk. We help sports organizations discover, boost, and recruit talent. 
                Would love to chat about how we can help your organization!
              </p>
            </CardContent>
            <CardFooter className="p-3 pt-0 flex flex-col gap-2">
              <Button size="sm" className="w-full bg-sportbnk-green hover:bg-sportbnk-green/90" onClick={handleOpenChat}>
                Get in touch
              </Button>
              <Button size="sm" className="w-full bg-sportbnk-navy hover:bg-sportbnk-navy/90" asChild>
                <Link to="/book-demo" className="flex items-center justify-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Book a meeting</span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Chat drawer for mobile */}
      <Drawer open={isPopupOpen} onOpenChange={setIsPopupOpen}>
        <DrawerTrigger asChild>
          <Button 
            className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-sportbnk-green hover:bg-sportbnk-green/90 shadow-lg flex items-center justify-center"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="p-0 max-h-[85vh]">
          <div className="bg-sportbnk-navy text-white p-4">
            <div className="flex items-center gap-2 mb-2">
              <img 
                src="/lovable-uploads/5de360aa-8105-490e-bf75-94ff7ac0832d.png" 
                alt="SportBnk Logo" 
                className="h-8 w-auto" 
              />
              <h3 className="font-semibold">Chat with SportBnk</h3>
            </div>
            <p className="text-sm opacity-90">
              Hi there! I'm Jared. How can I help you today?
            </p>
          </div>
          <div className="p-4 h-[300px] overflow-y-auto">
            <div className="bg-gray-100 p-3 rounded-lg inline-block max-w-[80%]">
              <p className="text-sm">
                We provide an intelligence platform for sports organizations to discover, boost, and recruit talent.
                Would love to hear more about your needs!
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="border-t p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" className="bg-sportbnk-green hover:bg-sportbnk-green/90">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ChatPopup;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Facebook, Telegram, Loader2, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SharingButtonsProps {
  url: string;
  title: string;
}

const SharingButtons: React.FC<SharingButtonsProps> = ({ url, title }) => {
  const { toast } = useToast();
  
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  
  const shareLinks = [
    {
      name: 'ВКонтакте',
      url: `https://vk.com/share.php?url=${encodedUrl}&title=${encodedTitle}`,
      className: 'bg-blue-600 hover:bg-blue-700',
      icon: <Facebook className="mr-2 h-4 w-4" />
    },
    {
      name: 'Telegram',
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      className: 'bg-[#0088cc] hover:bg-[#0077b5]',
      icon: <Telegram className="mr-2 h-4 w-4" />
    },
    {
      name: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${encodedTitle} ${encodedUrl}`,
      className: 'bg-[#25D366] hover:bg-[#20bd5c]',
      icon: <MessageCircle className="mr-2 h-4 w-4" />
    },
  ];
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(
      () => {
        toast({
          title: "Ссылка скопирована!",
          description: "Теперь вы можете вставить ее в любое место",
        });
      },
      (err) => {
        console.error('Could not copy text: ', err);
        toast({
          title: "Ошибка копирования",
          description: "Не удалось скопировать ссылку",
          variant: "destructive",
        });
      }
    );
  };
  
  return (
    <div className="flex flex-wrap gap-2">
      {shareLinks.map((link, index) => (
        <Button 
          key={index}
          variant="default"
          className={link.className}
          asChild
        >
          <a 
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center"
          >
            {link.icon}
            {link.name}
          </a>
        </Button>
      ))}
      
      <Button 
        variant="outline" 
        onClick={copyToClipboard}
        className="flex items-center"
      >
        <Copy className="mr-2 h-4 w-4" />
        Копировать ссылку
      </Button>
    </div>
  );
};

export default SharingButtons;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Link, MessageCircle, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// VK icon as SVG
const VKIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className="mr-2"
  >
    <path d="M21.579 6.855c.14-.465 0-.806-.662-.806h-2.193c-.558 0-.813.295-.953.619 0 0-1.115 2.719-2.695 4.482-.51.513-.743.675-1.021.675-.139 0-.341-.162-.341-.627V6.855c0-.558-.161-.806-.626-.806H9.642c-.348 0-.558.258-.558.504 0 .528.79.652.87 2.138v3.228c0 .707-.127.836-.407.836-.743 0-2.551-2.729-3.624-5.853-.209-.607-.42-.852-.98-.852H2.752c-.627 0-.752.295-.752.619 0 .582.743 3.462 3.461 7.271 1.812 2.601 4.363 4.011 6.687 4.011 1.393 0 1.565-.313 1.565-.853v-1.966c0-.626.133-.752.574-.752.324 0 .882.164 2.183 1.417 1.486 1.486 1.732 2.153 2.567 2.153h2.192c.626 0 .939-.313.759-.932-.197-.615-.907-1.51-1.849-2.569-.512-.604-1.277-1.254-1.51-1.579-.325-.419-.231-.605 0-.976.001 0 2.672-3.761 2.95-5.04z"/>
  </svg>
);

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
      icon: <VKIcon />
    },
    {
      name: 'Telegram',
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      className: 'bg-[#0088cc] hover:bg-[#0077b5]',
      icon: <MessageCircle className="mr-2 h-4 w-4" />
    },
    {
      name: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${encodedTitle} ${encodedUrl}`,
      className: 'bg-[#25D366] hover:bg-[#20bd5c]',
      icon: <Phone className="mr-2 h-4 w-4" />
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
        <Link className="mr-2 h-4 w-4" />
        Копировать ссылку
      </Button>
    </div>
  );
};

export default SharingButtons;

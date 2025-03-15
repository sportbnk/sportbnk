
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type TeamMemberProps = {
  name: string;
  role: string;
  image: string;
};

export const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image }) => (
  <Card className="border-0 shadow-sm overflow-hidden">
    <div className="aspect-square overflow-hidden bg-gray-100">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
    <CardContent className="pt-4">
      <h3 className="font-bold text-sportbnk-navy">{name}</h3>
      <p className="text-gray-600">{role}</p>
    </CardContent>
  </Card>
);

const MeetTheTeam = () => {
  return (
    <section className="py-16 bg-sportbnk-lightGrey">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-sportbnk-navy mb-4">
            Meet Our Leadership Team
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our team of industry experts is passionate about transforming how businesses connect in the sports sector.
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <TeamMember 
            name="Jared Wilson" 
            role="CEO & Founder" 
            image="/lovable-uploads/5a649dfb-5709-4042-bda2-aec41e85a32d.png"
          />
          <TeamMember 
            name="Chris Watts" 
            role="CTO" 
            image="/lovable-uploads/c5351de4-d54d-424f-99a5-b07ddc3fcc40.png"
          />
          <TeamMember 
            name="Matthew Price" 
            role="Chief of Sales" 
            image="/lovable-uploads/b727ac17-df3d-4270-a031-139c82129d27.png"
          />
          <TeamMember 
            name="Greg Thomas" 
            role="Director" 
            image="/lovable-uploads/d09f910d-17b2-4f81-bc3b-66badacf3de2.png"
          />
        </div>

        <div className="text-center">
          <Link to="/company/about#team">
            <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white px-6 py-2">
              Meet The Entire Team
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeam;

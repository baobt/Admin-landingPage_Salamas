import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ShoppingBag, LayoutDashboard, MessageSquare } from 'lucide-react';
import fallbackImage from '@/assets/hero.png';

import trangSanPhamImage from '../../../images/TrangSanPham.png?updated=20260406';
import myPersonalAccountImage from '../../../images/My personal account.jpg';
import chatImage from '../../../images/Chat.png';

function ProductDemoSection({ labels, images }) {
  const text = labels || {};

  const demos = [
    {
      id: 'listing',
      title: text.listing || 'Trang sản phẩm',
      icon: ShoppingBag,
      image: images?.product || trangSanPhamImage,
      description:
        text.listingDesc ||
        'Giao diện tìm kiếm và lọc sản phẩm với AI, so sánh giá, và đánh giá chi tiết',
    },
    {
      id: 'dashboard',
      title: text.dashboard || 'Bảng điều khiển',
      icon: LayoutDashboard,
      image: images?.dashboard || myPersonalAccountImage,
      description:
        text.dashboardDesc ||
        'Quản lý đơn hàng, theo dõi doanh thu, và phân tích hiệu suất bán hàng',
    },
    {
      id: 'chat',
      title: text.chat || 'Trò chuyện',
      icon: MessageSquare,
      image: images?.chat || chatImage,
      description:
        text.chatDesc ||
        'Hệ thống chat trực tiếp giữa người mua và người bán với dịch tự động',
    },
  ];

  const [activeTab, setActiveTab] = useState('listing');

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 h-auto p-1 bg-muted rounded-xl">
          {demos.map((demo) => (
            <TabsTrigger
              key={demo.id}
              value={demo.id}
              className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all duration-200"
            >
              <demo.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{demo.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {demos.map((demo) => (
          <TabsContent key={demo.id} value={demo.id} className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-none shadow-2xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid gap-0 md:min-h-[420px] md:grid-cols-2">

                    {/* IMAGE */}
                    <div className="relative h-64 md:h-[420px]">
                      <img
                        src={demo.image}
                        alt={demo.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = fallbackImage;
                        }}
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="flex min-h-[260px] flex-col justify-center bg-card p-8 md:min-h-[420px] md:p-12">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                        <demo.icon className="w-7 h-7 text-primary" />
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-balance">
                        {demo.title}
                      </h3>

                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {demo.description}
                      </p>
                    </div>

                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default ProductDemoSection;
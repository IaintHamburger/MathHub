import React from 'react';

const Math = () => {
    return (
        <div className="flex items-center flex-col justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-5xl font-bold mb-8">數學天地</h1>
            <div className="max-w-4xl mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">基礎數學</h2>
                        <ul className="space-y-2">
                            <li>• 代數</li>
                            <li>• 幾何</li>
                            <li>• 三角函數</li>
                        </ul>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">高等數學</h2>
                        <ul className="space-y-2">
                            <li>• 微積分</li>
                            <li>• 線性代數</li>
                            <li>• 機率統計</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Math; 
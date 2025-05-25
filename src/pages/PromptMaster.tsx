
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { promptMaster, PromptTemplate } from '../services/promptMaster';
import BottomNavigation from '../components/BottomNavigation';
import { toast } from 'sonner';

const PromptMaster = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'browse' | 'create'>('browse');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'chat' | 'image' | 'creative'>('all');
  const [templates, setTemplates] = useState<PromptTemplate[]>(promptMaster.getTemplates());
  
  // Create form state
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    category: 'chat' as 'chat' | 'image' | 'creative',
    template: '',
    description: '',
    variables: [] as string[]
  });

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  const extractVariables = (template: string): string[] => {
    const matches = template.match(/\{([^}]+)\}/g);
    return matches ? matches.map(match => match.slice(1, -1)) : [];
  };

  const handleTemplateChange = (template: string) => {
    const variables = extractVariables(template);
    setNewTemplate(prev => ({ ...prev, template, variables }));
  };

  const handleCreateTemplate = () => {
    if (!newTemplate.name || !newTemplate.template) {
      toast.error('Please fill in name and template fields');
      return;
    }

    try {
      const id = promptMaster.addCustomTemplate({
        name: newTemplate.name,
        category: newTemplate.category,
        template: newTemplate.template,
        variables: newTemplate.variables,
        description: newTemplate.description
      });

      setTemplates(promptMaster.getTemplates());
      setNewTemplate({
        name: '',
        category: 'chat',
        template: '',
        description: '',
        variables: []
      });
      setActiveTab('browse');
      toast.success('Template created successfully!');
    } catch (error) {
      toast.error('Failed to create template');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate('/')}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            ←
          </button>
          <h1 className="text-xl font-bold">Prompt Master</h1>
          <div className="w-10"></div>
        </div>

        {/* Tabs */}
        <div className="flex mb-6 bg-slate-800/50 rounded-2xl p-1">
          {(['browse', 'create'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 text-center py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              {tab === 'browse' ? 'Browse Templates' : 'Create Template'}
            </button>
          ))}
        </div>

        {activeTab === 'browse' ? (
          <div className="space-y-6">
            {/* Category Filter */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {(['all', 'chat', 'image', 'creative'] as const).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl whitespace-nowrap font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-800/50 text-slate-400 hover:text-slate-300'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            {/* Templates */}
            <div className="space-y-4">
              {filteredTemplates.map((template) => (
                <div key={template.id} className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/30">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{template.name}</h3>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      template.category === 'chat' ? 'bg-green-500/20 text-green-400' :
                      template.category === 'image' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-orange-500/20 text-orange-400'
                    }`}>
                      {template.category}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mb-3">{template.description}</p>
                  <div className="bg-slate-900/50 rounded-xl p-3 mb-3">
                    <p className="text-xs font-mono text-slate-300">{template.template}</p>
                  </div>
                  {template.variables.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs text-slate-400 mr-2">Variables:</span>
                      {template.variables.map((variable) => (
                        <span key={variable} className="px-2 py-1 bg-slate-700/50 rounded-md text-xs text-slate-300">
                          {variable}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Template Name</label>
                <Input
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter template name"
                  className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                <select
                  value={newTemplate.category}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, category: e.target.value as any }))}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2 px-3 text-white"
                >
                  <option value="chat">Chat</option>
                  <option value="image">Image</option>
                  <option value="creative">Creative</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Template</label>
                <Textarea
                  value={newTemplate.template}
                  onChange={(e) => handleTemplateChange(e.target.value)}
                  placeholder="Enter your template using {variable} syntax"
                  className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 min-h-[100px]"
                />
                <p className="text-xs text-slate-400 mt-1">Use {`{variableName}`} for variables</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <Input
                  value={newTemplate.description}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what this template does"
                  className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-400"
                />
              </div>

              {newTemplate.variables.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Detected Variables</label>
                  <div className="flex flex-wrap gap-2">
                    {newTemplate.variables.map((variable) => (
                      <span key={variable} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm">
                        {variable}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <Button
                onClick={handleCreateTemplate}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                Create Template
              </Button>
            </div>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default PromptMaster;

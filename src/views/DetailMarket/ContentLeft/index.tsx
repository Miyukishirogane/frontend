import { usePendleData } from 'src/jotai/pendle/pendle';
import TabsCustom from '../TabsCustom';
import PTPoolInactive from '../InactiveContent/PTPoolInactive';
import YTPoolInactive from '../InactiveContent/YTPoolInactive';

export default function ContentLeft() {
  const { tokenToggle, DetailPendetail } = usePendleData();

  const isPoolActive = Number(DetailPendetail?.daysLeft) > 0;

  if (!isPoolActive) {
    return tokenToggle === 'YT' ? <YTPoolInactive /> : <PTPoolInactive />;
  }

  return <TabsCustom />;
}
